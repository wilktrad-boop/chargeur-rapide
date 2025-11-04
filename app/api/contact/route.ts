import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prenom, email, message, captcha } = body;

    // Validation
    if (!prenom || !email || !message || !captcha) {
      return NextResponse.json(
        { ok: false, error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Vérification du captcha
    if (captcha !== '9') {
      return NextResponse.json(
        { ok: false, error: 'Captcha incorrect' },
        { status: 400 }
      );
    }

    // Vérification de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { ok: false, error: 'Email invalide' },
        { status: 400 }
      );
    }

    // Configuration Telegram
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Variables d\'environnement Telegram non configurées');
      return NextResponse.json(
        { ok: false, error: 'Configuration du formulaire incomplète. Veuillez contacter l\'administrateur.' },
        { status: 500 }
      );
    }

    // Formatage du message pour Telegram
    const telegramMessage = `
🔔 <b>Nouveau message du formulaire de contact</b>

👤 <b>Prénom:</b> ${prenom}
📧 <b>Email:</b> ${email}

💬 <b>Message:</b>
${message}

⏰ <i>Reçu le ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}</i>
    `.trim();

    // Envoi sur Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramMessage,
          parse_mode: 'HTML',
        }),
      }
    );

    if (!telegramResponse.ok) {
      const errorText = await telegramResponse.text();
      console.error('Erreur Telegram:', errorText);
      return NextResponse.json(
        { ok: false, error: 'Erreur lors de l\'envoi du message' },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Erreur dans l\'API contact:', error);
    return NextResponse.json(
      { ok: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
