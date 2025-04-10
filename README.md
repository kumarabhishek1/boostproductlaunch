# Boost Product Launch

A modern website for promoting and managing Product Hunt launches, featuring a contact form that submits data to Google Sheets.

## Features

- Contact form with validation
- Google Sheets integration
- Responsive design
- Modern UI with Tailwind CSS
- TypeScript support

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Hook Form
- Zod (for validation)
- Google Apps Script
- Vercel (for deployment)

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/boost-product-launch.git
cd boost-product-launch
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Google Sheets Setup

1. Create a new Google Sheet
2. Add these headers in the first row:
   - Timestamp
   - Full Name
   - Email
   - Phone
   - Website URL
   - Product Hunt URL
   - Message
3. Create a Google Apps Script (Extensions > Apps Script)
4. Deploy as a web app and update the script URL in the code

## Deployment

This project is deployed on Vercel. To deploy your own version:

1. Fork this repository
2. Connect your GitHub repository to Vercel
3. Configure the environment variables if needed
4. Deploy!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.



