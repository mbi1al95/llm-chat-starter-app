import { Context, Next } from 'hono';
import { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema<any>) => async (c: Context, next: Next) => {
  try {
    const body = await c.req.json();
    schema.parse(body); // parse body to schema | throw error
    await next();
  } catch (err: any) {
    return c.json({ error: err.errors || err.message }, 400);
  }
};
