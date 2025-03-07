import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-600 bg-neutral-900 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo ve açıklama */}
          <div className="space-y-3">
            <h3 className="text-green-200 font-semibold">Onyx AI</h3>
            <p className="text-neutral-300 text-sm">
              Explore the blockchain with AI-powered insights and real-time information.
            </p>
          </div>

          {/* Hızlı linkler */}
          <div>
            <h4 className="text-green-200 font-medium mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="" className="text-neutral-300 hover:text-green-200 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="https://docs.multiversx.com" target="_blank" className="text-neutral-300 hover:text-green-200 transition-colors text-sm">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h4 className="text-green-200 font-medium mb-3">Open Source</h4>
            <ul className="space-y-2">
              <li>
                <Link href="https://github.com/alperenbekci/onyxai" target="_blank" className="text-neutral-300 hover:text-green-200 transition-colors text-sm">
                  GitHub
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-green-200/10">
          <p className="text-center text-neutral-300 text-sm">
            © {new Date().getFullYear()} Onyx AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 