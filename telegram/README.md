## Local Ngrok Deployment
```bash
ngrok http 6969
```

## Production Webhook setting
```bash
curl -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook" \
  -d "url=https://findmyfood-telegram.vercel.app/user/webhook/${TELEGRAM_SECRET_HASH}" \
  -d "drop_pending_updates=true" \
  -d 'allowed_updates=["message","callback_query"]'
```