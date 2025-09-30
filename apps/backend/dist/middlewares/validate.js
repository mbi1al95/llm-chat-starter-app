export const validate = (schema) => async (c, next) => {
    try {
        const body = await c.req.json();
        schema.parse(body); // parse body to schema | throw error
        await next();
    }
    catch (err) {
        return c.json({ error: err.errors || err.message }, 400);
    }
};
