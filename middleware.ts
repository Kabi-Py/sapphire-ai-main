import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const acceptHeader = request.headers.get('accept') || '';
  const response = NextResponse.next();

  // Ensure Vary header is always present for proper CDN caching with content negotiation
  response.headers.set('Vary', 'Accept, Accept-Encoding');

  // Handle Markdown Content Negotiation via acceptmarkdown.com standard
  if (acceptHeader.includes('text/markdown')) {
    const markdownContent = `# Sapphire AI - Intelligence Unleashed

> Experience Sapphire AI: a powerful artificial intelligence assistant for code generation, conversational intelligence, and quick problem solving. Available for Web, Windows, and Android.

## Core Capabilities
- **Flash Mode**: Optimized for lightning-fast inference and minimal latency. Perfect for quick lookups, instant code snippets, and everyday productivity tasks.
- **Ultra Mode**: Engineered for advanced multi-step reasoning, deep context retention, and rigorous logical analysis.

## Developer Resources & Links
- **Web App**: [https://sapphire-ai-web.vercel.app/](https://sapphire-ai-web.vercel.app/)
- **API & MCP Server**: [https://sapphire-ai-main.vercel.app/.well-known/mcp](https://sapphire-ai-main.vercel.app/.well-known/mcp)
- **Developer Index**: [https://sapphire-ai-main.vercel.app/llms.txt](https://sapphire-ai-main.vercel.app/llms.txt)
- **About Us**: [https://sapphire-ai-main.vercel.app/about.html](https://sapphire-ai-main.vercel.app/about.html)
- **Contact**: support@sapphire-ai.com
`;
    return new NextResponse(markdownContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Vary': 'Accept, Accept-Encoding',
      },
    });
  }

  return response;
}

export const config = {
  matcher: ['/', '/index.html'],
};