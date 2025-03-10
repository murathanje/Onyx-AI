import { NextResponse } from 'next/server';
import { initializeAgentExecutorWithOptions } from 'langchain/agents';
import { DynamicTool } from '@langchain/core/tools';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { queryVectorStore } from '@/utils/rag';

// MultiversX API tools
const getAccountDetails = new DynamicTool({
  name: 'get_account_details',
  description: 'Use this tool to get account details. Requires an address parameter.',
  async func(address: string) {
    const response = await fetch(`https://api.multiversx.com/accounts/${address}`);
    const data = await response.json();
    return JSON.stringify(data);
  },
});

const getTokenDetails = new DynamicTool({
  name: 'get_token_details',
  description: 'Use this tool to get token details. Requires a token identifier.',
  async func(identifier: string) {
    const response = await fetch(`https://api.multiversx.com/tokens/${identifier}`);
    const data = await response.json();
    return JSON.stringify(data);
  },
});

const getNftDetails = new DynamicTool({
  name: 'get_nft_details',
  description: 'Use this tool to get NFT details. Requires an NFT identifier.',
  async func(identifier: string) {
    const response = await fetch(`https://api.multiversx.com/nfts/${identifier}`);
    const data = await response.json();
    return JSON.stringify(data);
  },
});

const getNetworkStats = new DynamicTool({
  name: 'get_network_stats',
  description: 'Use this tool to get MultiversX network statistics.',
  async func() {
    const response = await fetch('https://api.multiversx.com/stats');
    const data = await response.json();
    return JSON.stringify(data);
  },
});

const getWebsiteInfo = new DynamicTool({
  name: 'get_website_info',
  description: 'Use this tool to get information from MultiversX website about features, technology, or general information.',
  async func(query: string) {
    const results = await queryVectorStore(query);
    return JSON.stringify({ context: results });
  },
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Initialize Gemini model
    const model = new ChatGoogleGenerativeAI({
      modelName: 'gemini-2.0-flash',
      maxOutputTokens: 2048,
      temperature: 0.7,
      apiKey: process.env.GOOGLE_API_KEY,
    });

    // Create agent
    const executor = await initializeAgentExecutorWithOptions(
      [
        getAccountDetails,
        getTokenDetails,
        getNftDetails,
        getNetworkStats,
        getWebsiteInfo
      ],
      model,
      {
        agentType: 'chat-conversational-react-description',
        verbose: true,
        handleParsingErrors: true,
        maxIterations: 3,
      }
    );

    // Run agent
    const result = await executor.invoke({
      input: message,
      chat_history: [],
    });

    return NextResponse.json({ response: result.output });
  } catch (error: unknown) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
} 