const fs = require('fs');
let c = fs.readFileSync('apps/api/src/conversation/conversation.controller.ts', 'utf8');

c = c.replace(/profile: \{\s*select: \{ firstName: true, lastName: true, avatarUrl: true \},\s*\}/g, `profile: {
                select: { firstName: true, lastName: true, avatarUrl: true },
              },
              doctorProfile: {
                select: {
                  specialization: true,
                  isVerified: true,
                },
              }`);

c = c.replace(/await redis\.set\(cacheKey, JSON\.stringify\(result\), "EX", 300\);\r?\n\s*res\.json\(result\);\s*\}\);/, `await redis.set(cacheKey, JSON.stringify({ conversations: result }), "EX", 300);
  res.json({ conversations: result });
});`);

fs.writeFileSync('apps/api/src/conversation/conversation.controller.ts', c);
