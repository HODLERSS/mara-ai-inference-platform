'use client'

import { useState } from 'react'
import {
  Box,
  Tabs,
  Tab,
  Paper,
  IconButton,
  Typography,
  Tooltip,
} from '@mui/material'
import { ContentCopy, CheckCircle } from '@mui/icons-material'

interface CodeGeneratorProps {
  model: string
  prompt: string
  maxTokens: number
  temperature: number
  apiKey?: string
}

export function CodeGenerator({
  model,
  prompt,
  maxTokens,
  temperature,
  apiKey = 'sk-mara-your-api-key-here'
}: CodeGeneratorProps) {
  const [selectedTab, setSelectedTab] = useState(0)
  const [copiedStates, setCopiedStates] = useState<Record<number, boolean>>({})

  const generateCode = (language: string) => {
    const escapedPrompt = prompt.replace(/"/g, '\\"').replace(/\n/g, '\\n')

    switch (language) {
      case 'curl':
        return `curl -X POST https://api.mara.ai/v1/chat/completions \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${model}",
    "messages": [
      {"role": "user", "content": "${escapedPrompt}"}
    ],
    "max_tokens": ${maxTokens},
    "temperature": ${temperature}
  }'`

      case 'python':
        return `import requests
import json

url = "https://api.mara.ai/v1/chat/completions"
headers = {
    "Authorization": "Bearer ${apiKey}",
    "Content-Type": "application/json"
}

payload = {
    "model": "${model}",
    "messages": [
        {"role": "user", "content": "${escapedPrompt}"}
    ],
    "max_tokens": ${maxTokens},
    "temperature": ${temperature}
}

response = requests.post(url, headers=headers, json=payload)
result = response.json()

print(f"Response: {result['choices'][0]['message']['content']}")
print(f"Usage: {result['usage']['total_tokens']} tokens")`

      case 'javascript':
        return `const response = await fetch('https://api.mara.ai/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ${apiKey}',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: '${model}',
    messages: [
      { role: 'user', content: '${escapedPrompt}' }
    ],
    max_tokens: ${maxTokens},
    temperature: ${temperature}
  })
});

const result = await response.json();
console.log('Response:', result.choices[0].message.content);
console.log('Usage:', result.usage.total_tokens, 'tokens');`

      case 'go':
        return `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
)

type ChatRequest struct {
    Model       string    \`json:"model"\`
    Messages    []Message \`json:"messages"\`
    MaxTokens   int       \`json:"max_tokens"\`
    Temperature float64   \`json:"temperature"\`
}

type Message struct {
    Role    string \`json:"role"\`
    Content string \`json:"content"\`
}

func main() {
    req := ChatRequest{
        Model: "${model}",
        Messages: []Message{
            {Role: "user", Content: "${escapedPrompt}"},
        },
        MaxTokens:   ${maxTokens},
        Temperature: ${temperature},
    }

    jsonData, _ := json.Marshal(req)

    client := &http.Client{}
    httpReq, _ := http.NewRequest("POST", "https://api.mara.ai/v1/chat/completions", bytes.NewBuffer(jsonData))
    httpReq.Header.Set("Authorization", "Bearer ${apiKey}")
    httpReq.Header.Set("Content-Type", "application/json")

    resp, _ := client.Do(httpReq)
    defer resp.Body.Close()

    fmt.Println("Chat completion request sent successfully")
}`

      default:
        return ''
    }
  }

  const languages = [
    { name: 'cURL', key: 'curl' },
    { name: 'Python', key: 'python' },
    { name: 'JavaScript', key: 'javascript' },
    { name: 'Go', key: 'go' },
  ]

  const handleCopy = async (code: string, tabIndex: number) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedStates(prev => ({ ...prev, [tabIndex]: true }))
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [tabIndex]: false }))
      }, 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Code Examples
      </Typography>

      <Paper sx={{ mt: 2 }}>
        <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
          {languages.map((lang, index) => (
            <Tab key={lang.key} label={lang.name} />
          ))}
        </Tabs>

        {languages.map((lang, index) => (
          <Box
            key={lang.key}
            hidden={selectedTab !== index}
            sx={{ position: 'relative' }}
          >
            {selectedTab === index && (
              <>
                <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
                  <Tooltip title={copiedStates[index] ? 'Copied!' : 'Copy code'}>
                    <IconButton
                      size="small"
                      onClick={() => handleCopy(generateCode(lang.key), index)}
                      sx={{
                        bgcolor: 'background.paper',
                        boxShadow: 1,
                        '&:hover': { bgcolor: 'grey.100' }
                      }}
                    >
                      {copiedStates[index] ? (
                        <CheckCircle color="success" fontSize="small" />
                      ) : (
                        <ContentCopy fontSize="small" />
                      )}
                    </IconButton>
                  </Tooltip>
                </Box>

                <Paper
                  sx={{
                    p: 2,
                    bgcolor: 'grey.900',
                    color: 'white',
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    borderRadius: 0,
                    borderBottomLeftRadius: 1,
                    borderBottomRightRadius: 1,
                    overflow: 'auto',
                    maxHeight: 400,
                  }}
                >
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                    {generateCode(lang.key)}
                  </pre>
                </Paper>
              </>
            )}
          </Box>
        ))}
      </Paper>
    </Box>
  )
}