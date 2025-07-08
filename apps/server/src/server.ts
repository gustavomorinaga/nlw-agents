import fastifyCors from '@fastify/cors';
import fastify from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import {
	serializerCompiler,
	validatorCompiler,
} from 'fastify-type-provider-zod';
import { env } from './env.ts';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
	origin: 'http://localhost:5173',
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get('/health', () => 'OK');

app.listen({ port: env.PORT }).then(() => {
	// console.log(`Server is running on http://localhost:${env.PORT}`);
});
