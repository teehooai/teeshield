"""Toxic Flow heuristic -- detect dangerous tool capability combinations.

Classifies tool/skill capabilities by role (data_source, public_sink, destructive)
and flags dangerous combinations that indicate exfiltration or destructive flows.

Inspired by MCPhound TF analysis and Snyk ToxicSkills research.

Classification is keyword-based on SKILL.md content -- not 100% accurate but
catches common dangerous patterns with low false-positive rate.
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field


# --- Capability classification keywords ---

# Words/phrases indicating data access capabilities
DATA_SOURCE_KEYWORDS: list[tuple[str, str]] = [
    (r"\bread\s+file", "read file"),
    (r"\bfile\s+read", "file read"),
    (r"\blist\s+files", "list files"),
    (r"\blist\s+director", "list directory"),
    (r"\bfile\s+system", "filesystem"),
    (r"\bdatabase\b", "database"),
    (r"\bquery\b.*\b(table|sql|select|from)\b", "database query"),
    (r"\bsql\b", "SQL"),
    (r"\bget\s+env", "get env"),
    (r"\benviron", "environment variables"),
    (r"\bcredential", "credentials"),
    (r"\bsecret", "secrets"),
    (r"\bpassword", "password"),
    (r"\btoken\b", "token"),
    (r"\bapi.?key", "API key"),
    (r"\bssh\b.*\bkey", "SSH key"),
    (r"\bconfig\s+file", "config file"),
    (r"\b\.env\b", ".env file"),
    (r"\bkeychain", "keychain"),
    (r"\bclipboard", "clipboard"),
    (r"\bscreenshot", "screenshot"),
    (r"\bscrape\b", "scrape"),
    (r"\bcrawl\b", "crawl"),
]

# Words/phrases indicating external send capabilities
PUBLIC_SINK_KEYWORDS: list[tuple[str, str]] = [
    (r"\bsend\s+(email|mail|message|http|request|data)", "send data"),
    (r"\bpost\s+(to|data|message|request)", "post data"),
    (r"\bhttp\s*(post|put|patch)", "HTTP write"),
    (r"\bupload\b", "upload"),
    (r"\bwebhook", "webhook"),
    (r"\b(slack|discord)\b.*\b(send|post|message)", "messaging"),
    (r"\b(send|post)\b.*\b(slack|discord)\b", "messaging"),
    (r"\bemail\b.*\bsend", "email send"),
    (r"\bsend\b.*\bemail", "send email"),
    (r"\btweet\b", "tweet"),
    (r"\bpublish\b", "publish"),
    (r"\bforward\b.*\bto", "forward to"),
    (r"\bexport\b.*\b(to|external)", "export"),
    (r"\btransfer\b", "transfer"),
    (r"\bpaste\b.*\b(bin|service)", "paste service"),
    (r"\bpastebin", "pastebin"),
]

# Words/phrases indicating destructive capabilities
DESTRUCTIVE_KEYWORDS: list[tuple[str, str]] = [
    (r"\bdelete\s+file", "delete file"),
    (r"\bremove\s+file", "remove file"),
    (r"\brm\s+-", "rm command"),
    (r"\bdrop\s+(table|database|collection)", "drop table/db"),
    (r"\btruncate\s+(table|log)", "truncate"),
    (r"\boverwrite\b", "overwrite"),
    (r"\bformat\s+disk", "format disk"),
    (r"\bkill\s+(process|pid)", "kill process"),
    (r"\bshutdown\b", "shutdown"),
    (r"\breboot\b", "reboot"),
    (r"\bexec\b.*\bcommand", "exec command"),
    (r"\bshell\b.*\bexecut", "shell execute"),
    (r"\brun\s+command", "run command"),
    (r"\bmodify\s+(system|config|registry)", "modify system"),
    (r"\bchmod\b", "chmod"),
    (r"\bchown\b", "chown"),
    (r"\bwrite\s+file", "write file"),
]


@dataclass
class FlowClassification:
    """Result of classifying a skill's capabilities."""

    data_sources: list[str] = field(default_factory=list)
    public_sinks: list[str] = field(default_factory=list)
    destructive: list[str] = field(default_factory=list)

    @property
    def has_data_source(self) -> bool:
        return len(self.data_sources) > 0

    @property
    def has_public_sink(self) -> bool:
        return len(self.public_sinks) > 0

    @property
    def has_destructive(self) -> bool:
        return len(self.destructive) > 0


@dataclass
class ToxicFlow:
    """A detected dangerous capability combination."""

    flow_type: str  # "exfiltration" or "destructive"
    description: str
    sources: list[str]
    sinks: list[str]


def classify_capabilities(content: str) -> FlowClassification:
    """Classify a skill's capabilities from its SKILL.md content.

    Returns a FlowClassification with matched capability keywords.
    """
    result = FlowClassification()

    for pattern, label in DATA_SOURCE_KEYWORDS:
        if re.search(pattern, content, re.IGNORECASE):
            if label not in result.data_sources:
                result.data_sources.append(label)

    for pattern, label in PUBLIC_SINK_KEYWORDS:
        if re.search(pattern, content, re.IGNORECASE):
            if label not in result.public_sinks:
                result.public_sinks.append(label)

    for pattern, label in DESTRUCTIVE_KEYWORDS:
        if re.search(pattern, content, re.IGNORECASE):
            if label not in result.destructive:
                result.destructive.append(label)

    return result


def detect_toxic_flows(content: str) -> list[ToxicFlow]:
    """Detect dangerous capability combinations in skill content.

    Returns list of ToxicFlow findings (may be empty if safe).
    """
    classification = classify_capabilities(content)
    flows: list[ToxicFlow] = []

    # Flow 1: data_source → public_sink = exfiltration
    if classification.has_data_source and classification.has_public_sink:
        flows.append(ToxicFlow(
            flow_type="exfiltration",
            description=(
                f"Skill can read sensitive data ({', '.join(classification.data_sources[:3])}) "
                f"AND send externally ({', '.join(classification.public_sinks[:3])}). "
                f"Potential data exfiltration flow."
            ),
            sources=classification.data_sources,
            sinks=classification.public_sinks,
        ))

    # Flow 2: data_source → destructive = ransom/wipe
    if classification.has_data_source and classification.has_destructive:
        flows.append(ToxicFlow(
            flow_type="destructive",
            description=(
                f"Skill can access data ({', '.join(classification.data_sources[:3])}) "
                f"AND perform destructive actions ({', '.join(classification.destructive[:3])}). "
                f"Potential ransomware or data destruction flow."
            ),
            sources=classification.data_sources,
            sinks=classification.destructive,
        ))

    return flows
