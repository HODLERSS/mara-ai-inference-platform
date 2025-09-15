'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
  Box,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  Chip,
} from '@mui/material'
import { ContentCopy, Check } from '@mui/icons-material'

interface ApiCodeDialogProps {
  open: boolean
  onClose: () => void
  modelId: string
  modelName: string
}

export function ApiCodeDialog({ open, onClose, modelId, modelName }: ApiCodeDialogProps) {
  const [activeTab, setActiveTab] = useState(0)
  const [copiedLanguage, setCopiedLanguage] = useState<string | null>(null)

  const generateCode = (language: string) => {
    const baseUrl = 'https://api.mara.ai/v1'
    const apiKey = 'sk-mara-...'

    switch (language) {
      case 'javascript':
        return `// Install: npm install openai
import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: '${baseUrl}',
  apiKey: '${apiKey}',
});

async function main() {
  const completion = await client.chat.completions.create({
    model: '${modelId}',
    messages: [
      { role: 'user', content: 'Hello, how are you?' }
    ],
    max_tokens: 100,
    temperature: 0.7
  });

  console.log(completion.choices[0].message.content);
}

main();`

      case 'python':
        return `# Install: pip install openai
from openai import OpenAI

client = OpenAI(
    base_url="${baseUrl}",
    api_key="${apiKey}"
)

response = client.chat.completions.create(
    model="${modelId}",
    messages=[
        {"role": "user", "content": "Hello, how are you?"}
    ],
    max_tokens=100,
    temperature=0.7
)

print(response.choices[0].message.content)`

      case 'curl':
        return `curl -X POST "${baseUrl}/chat/completions" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -d '{
    "model": "${modelId}",
    "messages": [
      {"role": "user", "content": "Hello, how are you?"}
    ],
    "max_tokens": 100,
    "temperature": 0.7
  }'`

      case 'golang':
        return `// go mod init your-project
// go get github.com/sashabaranov/go-openai
package main

import (
    "context"
    "fmt"
    "github.com/sashabaranov/go-openai"
)

func main() {
    config := openai.DefaultConfig("${apiKey}")
    config.BaseURL = "${baseUrl}"
    client := openai.NewClientWithConfig(config)

    resp, err := client.CreateChatCompletion(
        context.Background(),
        openai.ChatCompletionRequest{
            Model: "${modelId}",
            Messages: []openai.ChatCompletionMessage{
                {
                    Role:    openai.ChatMessageRoleUser,
                    Content: "Hello, how are you?",
                },
            },
            MaxTokens:   100,
            Temperature: 0.7,
        },
    )

    if err != nil {
        fmt.Printf("Error: %v\\n", err)
        return
    }

    fmt.Println(resp.Choices[0].Message.Content)
}`

      case 'java':
        return `// Add to pom.xml:
// <dependency>
//   <groupId>com.theokanning.openai-gpt3-java</groupId>
//   <artifactId>service</artifactId>
//   <version>0.18.2</version>
// </dependency>

import com.theokanning.openai.OpenAiApi;
import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatMessage;
import com.theokanning.openai.service.OpenAiService;
import retrofit2.Retrofit;

import java.util.List;
import java.time.Duration;

public class MaraAiExample {
    public static void main(String[] args) {
        OpenAiApi api = new Retrofit.Builder()
            .baseUrl("${baseUrl}/")
            .build()
            .create(OpenAiApi.class);

        OpenAiService service = new OpenAiService(api, "${apiKey}", Duration.ofSeconds(30));

        ChatCompletionRequest request = ChatCompletionRequest.builder()
            .model("${modelId}")
            .messages(List.of(
                new ChatMessage("user", "Hello, how are you?")
            ))
            .maxTokens(100)
            .temperature(0.7)
            .build();

        service.createChatCompletion(request)
            .getChoices()
            .forEach(choice -> System.out.println(choice.getMessage().getContent()));
    }
}`

      default:
        return ''
    }
  }

  const languages = [
    { key: 'python', label: 'Python' },
    { key: 'javascript', label: 'JavaScript' },
    { key: 'curl', label: 'cURL' },
    { key: 'golang', label: 'Go' },
    { key: 'java', label: 'Java' },
  ]

  const handleCopy = async (language: string) => {
    const code = generateCode(language)
    await navigator.clipboard.writeText(code)
    setCopiedLanguage(language)
    setTimeout(() => setCopiedLanguage(null), 2000)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6">API Code Examples</Typography>
        <Typography variant="body2" color="text.secondary">
          {modelName} • OpenAI-compatible API
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
            {languages.map((lang, index) => (
              <Tab
                key={lang.key}
                label={lang.label}
              />
            ))}
          </Tabs>
        </Box>

        {languages.map((lang, index) => (
          <Box key={lang.key} hidden={activeTab !== index}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle2">
                {lang.label} Example
              </Typography>
              <Tooltip title={copiedLanguage === lang.key ? "Copied!" : "Copy to clipboard"}>
                <IconButton
                  size="small"
                  onClick={() => handleCopy(lang.key)}
                  color={copiedLanguage === lang.key ? "success" : "default"}
                >
                  {copiedLanguage === lang.key ? <Check /> : <ContentCopy />}
                </IconButton>
              </Tooltip>
            </Box>

            <Paper
              variant="outlined"
              sx={{
                p: 2,
                bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
                color: (theme) => theme.palette.mode === 'dark' ? 'grey.100' : 'grey.900',
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                overflow: 'auto',
                maxHeight: 400
              }}
            >
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                {generateCode(lang.key)}
              </pre>
            </Paper>
          </Box>
        ))}

        <Box sx={{
          mt: 3,
          p: 2,
          bgcolor: (theme) => theme.palette.mode === 'dark' ? 'info.dark' : 'info.50',
          borderRadius: 1
        }}>
          <Typography variant="subtitle2" gutterBottom>
            💡 Quick Start Tips
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • Replace <code>sk-mara-...</code> with your actual API key from the API Keys page
            • All examples use the OpenAI SDK for maximum compatibility
            • Check our <a href="/api-docs">API documentation</a> for complete reference
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" href="/api-keys">
          Generate API Key
        </Button>
      </DialogActions>
    </Dialog>
  )
}