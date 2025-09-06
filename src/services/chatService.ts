import { GoogleGenerativeAI } from "@google/generative-ai";

const GOOGLE_API_KEY = "AIzaSyDQpto1N8atEvHVYOOuYl024HJcHPDlOys";

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isTyping?: boolean;
}

export class ChatService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    this.genAI = new GoogleGenerativeAI(GOOGLE_API_KEY as string);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  async sendMessage(message: string): Promise<string> {
    try {
      console.log('Sending message to Gemini:', message);
      const result = await this.model.generateContent(message);
      const response = await result.response;
      const text = response.text();
      console.log('Received response from Gemini:', text);
      return text;
    } catch (error) {
      console.error('Primary model failed, trying fallbacks...', error);

      const modelFallbacks = [
        'gemini-1.5-flash-latest',
        'gemini-1.5-pro',
        'gemini-1.5-pro-latest',
      ];

      for (const mdl of modelFallbacks) {
        try {
          this.model = this.genAI.getGenerativeModel({ model: mdl });
          const result = await this.model.generateContent(message);
          const response = await result.response;
          const text = response.text();
          console.log(`Received response from fallback ${mdl}:`, text);
          return text;
        } catch (e) {
          console.warn(`Fallback model ${mdl} failed`, e);
          continue;
        }
      }

      // Provide more specific error messages
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          throw new Error('Invalid API key. Please check your Google AI API key.');
        } else if (error.message.includes('quota')) {
          throw new Error('API quota exceeded. Please try again later.');
        } else if (error.message.toLowerCase().includes('not found')) {
          throw new Error('Model not found. Please check that the selected model is available.');
        } else if (error.message.includes('blocked')) {
          throw new Error('Content was blocked by safety filters. Please try rephrasing your message.');
        }
      }

      throw new Error('Failed to get response from AI. Please try again.');
    }
  }

  generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
}

export const chatService = new ChatService();