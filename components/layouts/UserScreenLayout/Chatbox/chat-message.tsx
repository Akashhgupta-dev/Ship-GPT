import { Box, IconButton, Tooltip } from "@mui/material";
import { ChatMessage } from "@/utils/types";
import { COLORS } from "@/utils/enum";
import { Poppins } from "@/utils/font";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useRef, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

type Props = {
  messages: ChatMessage[];
};

const MessageItem = ({ msg }: { msg: ChatMessage }) => {
  const [copied, setCopied] = useState(false);

  const WELCOME_TEXT = "Welcome to ShipGPT. I’m here to help you.";
  const isWelcome = msg.content === WELCOME_TEXT;

  const handleCopy = () => {
    const textToCopy = msg.content;

    // Primary: navigator.clipboard
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => fallbackCopy(textToCopy));
    } else {
      fallbackCopy(textToCopy);
    }
  };

  const fallbackCopy = (text: string) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      // Ensure it's not visible or disruptive
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Fallback copy failed", err);
    }
  };

  // console.log("RENDERING MESSAGE:", msg);
  return (
    <Box
      sx={{
        mr:
          String(msg.role).toLowerCase().trim() === "user"
            ? { xs: 2, md: 6.5 }
            : 0,
        mb: { xs: 2, md: 3 },
        display: "flex",
        justifyContent:
          String(msg.role).toLowerCase().trim() === "user"
            ? "flex-end"
            : "flex-start",
        position: "relative",
      }}
    >
      <Box
        sx={{
          maxWidth: { xs: "90%", md: "85%" },
          p:
            String(msg.role).toLowerCase().trim() === "user"
              ? { xs: "8px 16px", md: "10px 24px" }
              : { xs: 1, md: 1.5 },
          borderRadius:
            String(msg.role).toLowerCase().trim() === "user" ? "16px" : "12px",
          backgroundColor:
            String(msg.role).toLowerCase().trim() === "user"
              ? COLORS.ACCENT
              : "transparent",
          color: COLORS.TEXT_PRIMARY,
          border: "none",
          boxShadow: "none",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            fontSize: { xs: 14, md: 15 },
            color: COLORS.TEXT_PRIMARY,
            fontFamily: Poppins.style.fontFamily,
            lineHeight: 1.5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            "& p": {
              margin: 0,
              "&:not(:last-child)": { mb: 1.5 },
            },
            "& ul, & ol": { pl: 2, my: 1 },
            "& li": { mb: 0.5 },
            "& h1, & h2, & h3, & h4, & h5, & h6": {
              my: 1.5,
              fontWeight: 600,
              color: COLORS.WHITE,
            },
            "& code": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              px: 0.5,
              borderRadius: "4px",
              fontFamily: "monospace",
            },
            "& pre": {
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              p: 1.5,
              borderRadius: "8px",
              overflowX: "auto",
              my: 1.5,
              "& code": { backgroundColor: "transparent", p: 0 },
            },
          }}
        >
          {msg.content === "Thinking..." ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              Thinking
              <Box
                component="span"
                sx={{
                  display: "inline-flex",
                  gap: "2px",
                  "& span": {
                    width: "3px",
                    height: "3px",
                    borderRadius: "50%",
                    backgroundColor: COLORS.TEXT_PRIMARY,
                    animation: "dots 1.4s infinite ease-in-out",
                    "&:nth-of-type(2)": { animationDelay: "0.2s" },
                    "&:nth-of-type(3)": { animationDelay: "0.4s" },
                    "&:nth-of-type(4)": { animationDelay: "0.6s" },
                    "&:nth-of-type(5)": { animationDelay: "0.8s" },
                  },
                  "@keyframes dots": {
                    "0%, 80%, 100%": { opacity: 0 },
                    "40%": { opacity: 1 },
                  },
                }}
              >
                <span />
                <span />
                <span />
                <span />
                <span />
              </Box>
            </Box>
          ) : (
            <>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {(msg.content || "").replace(/\s+([a-z\d]\))/gi, "\n\n$1")}
              </ReactMarkdown>
              {String(msg.role).toLowerCase().trim() === "assistant" &&
                !isWelcome &&
                msg.content !== "Thinking..." && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      mt: 0.5,
                    }}
                  >
                    <Tooltip title={copied ? "Copied!" : "Copy response"}>
                      <IconButton
                        onClick={handleCopy}
                        size="small"
                        sx={{
                          color: COLORS.TEXT_PRIMARY,
                          opacity: 0.7,
                          "&:hover": {
                            opacity: 1,
                            backgroundColor: "rgba(255,255,255,0.05)",
                          },
                        }}
                      >
                        {copied ? (
                          <CheckIcon sx={{ fontSize: 16, color: "#4caf50" }} />
                        ) : (
                          <ContentCopyIcon sx={{ fontSize: 16 }} />
                        )}
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

const ChatMessages = ({ messages }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Box
      ref={scrollRef}
      sx={{
        flex: 1,
        overflowY: "auto",
        py: { xs: 2, md: 4 },
        display: "flex",
        flexDirection: "column",
        scrollBehavior: "smooth",
        animation: "fadeInUp 0.4s ease-out",
        "@keyframes fadeInUp": {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      <Box
        sx={{
          maxWidth: 920,
          width: "100%",
          mx: "auto",
          px: { xs: 1.5, sm: 2, md: 3 },
          flexGrow: 1,
        }}
      >
        {messages.map((msg, index) => (
          <MessageItem key={index} msg={msg} />
        ))}
      </Box>
    </Box>
  );
};

export default ChatMessages;
