import { GoogleGenAI } from '@google/genai';
import { env } from '../env.ts';

const gemini = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

const contentModel = 'gemini-2.5-flash';
const embeddingModel = 'text-embedding-004';

export async function transcribeAudio(audioAsBase64: string, mimeType: string) {
	const prompt = `
		Transcribe the following audio to Brazilian Portuguese.
		Be as accurate and natural as possible.
		Maintain proper punctuation and divide text into paragraphs when appropriate.
	`;

	const response = await gemini.models.generateContent({
		model: contentModel,
		contents: [
			{ text: prompt },
			{ inlineData: { data: audioAsBase64, mimeType } },
		],
	});

	if (!response.text) {
		throw new Error('Unable to transcribe audio.');
	}

	return response.text;
}

export async function generateEmbeddings(text: string) {
	const response = await gemini.models.embedContent({
		model: embeddingModel,
		contents: [{ text }],
		config: {
			taskType: 'RETRIEVAL_DOCUMENT',
		},
	});

	if (!response.embeddings?.[0]?.values) {
		throw new Error('Unable to generate embeddings.');
	}

	return response.embeddings[0].values;
}

export async function generateAnswer(
	question: string,
	transcriptions: string[]
) {
	const context = transcriptions.join('\n\n');

	const prompt = `
		Based on the following text with context, answer the question clearly and accurately in Brazilian Portuguese.

		Context:
		${context}

		Question:
		${question}

		Instructions:
		- Use only the information provided in the context;
		- If the answer is not found in the context, respond that don't have enough information to answer the question;
		- Be objective and concise;
		- Maintain an educational and professional tone;
		- Cite relevant excerpts from the context if appropriate;
		- If you are citing the context, use the term "conteúdo da aula"
	`.trim();

	const response = await gemini.models.generateContent({
		model: contentModel,
		contents: [{ text: prompt }],
	});

	if (!response.text) {
		throw new Error('Unable to generate answer.');
	}

	return response.text;
}
