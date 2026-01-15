import { Box } from "@mui/material";
import { ChatMessage } from "@/utils/types";
import { COLORS } from "@/utils/enum";
import { Poppins } from "@/utils/font";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useRef } from "react";

type Props = {
  messages: ChatMessage[];
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
      }}
    >
      <Box
        sx={{
          maxWidth: 820,
          width: "100%",
          mx: "auto",
          px: { xs: 1.5, sm: 2, md: 3 },
          flexGrow: 1,
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              mb: { xs: 2, md: 3 },
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <Box
              sx={{
                maxWidth: { xs: "90%", md: "85%" },
                p: msg.role === "user" ? "10px 24px" : { xs: 1, md: 1.5 },
                borderRadius: msg.role === "user" ? "30px" : "12px",
                backgroundColor:
                  msg.role === "user" ? COLORS.ACCENT : "transparent",
                color: COLORS.TEXT_PRIMARY,
                border: "none",
                boxShadow: "none",
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
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {msg.content}
                </ReactMarkdown>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ChatMessages;
