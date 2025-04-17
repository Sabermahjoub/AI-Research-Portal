import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Hero Section with Navigation -->
    <header class="bg-gradient-to-r from-red-900 to-red-700 text-white">
      <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
        <div class="h-20 flex justify-center items-center overflow-hidden">
              <img
              src="/images/coreAI.png"
              alt="Logo CoreAI"
              class="w-44 h-44"
            />
        </div>    

        <div class="hidden md:flex items-center space-x-6">
          <a href="#features" class="hover:text-red-200 transition">Features</a>
          <a href="#solutions" class="hover:text-red-200 transition">Solutions</a>
          <a href="#pricing" class="hover:text-red-200 transition">Pricing</a>
          <a href="#about" class="hover:text-red-200 transition">About</a>
        </div>
        <div class="hidden md:flex items-center space-x-4">
          <!-- Authentication Placeholder - Replace with your auth components later -->
          <button [routerLink]="['/login']" class="bg-white text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition">Sign In</button>
          <button [routerLink]="['/signup']" class="bg-red-500 px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition">Sign Up</button>
        </div>
        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button class="outline-none mobile-menu-button">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </nav>

      <!-- Hero Content -->
      <div class="container mx-auto px-6 py-16 text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-4">Next-Gen AI Research Portal</h1>
        <p class="text-xl mb-8 max-w-2xl mx-auto">Discover, analyze, and leverage cutting-edge AI research with our powerful coreAI platform.</p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <button class="bg-white text-red-700 px-6 py-3 rounded-lg font-medium text-lg hover:bg-red-100 transition">Get Started</button>
        </div>
      </div>
      
      <!-- Wave Separator -->
      <div class="w-full">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,96L48,85.3C96,75,192,53,288,58.7C384,64,480,96,576,96C672,96,768,64,864,80C960,96,1056,160,1152,160C1248,160,1344,96,1392,64L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fill="white"></path>
        </svg>
      </div>
    </header>

    <!-- Features Section -->
    <section id="features" class="py-16 bg-white">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">Powerful AI Research Features</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-xl shadow-lg border-t-4 border-red-600 hover:shadow-xl transition">
            <div class="text-red-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-gray-800">AI Research Discovery</h3>
            <p class="text-gray-600">Access a comprehensive database of the latest AI research papers, sorted and categorized for easy discovery.</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-lg border-t-4 border-red-600 hover:shadow-xl transition">
            <div class="text-red-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-gray-800">Advanced Analytics</h3>
            <p class="text-gray-600">Visualize research trends, track citation networks, and identify emerging fields in AI development.</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-lg border-t-4 border-red-600 hover:shadow-xl transition">
            <div class="text-red-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-gray-800">Collaboration Tools</h3>
            <p class="text-gray-600">Connect with researchers worldwide, collaborate on projects, and share insights within secure workspaces.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- AI Tools Section -->
    <section id="tools" class="py-16 bg-gray-50">
      <div class="container mx-auto px-6">
        <div class="flex flex-col md:flex-row items-center">
          <div class="md:w-1/2 mb-8 md:mb-0">
            <h2 class="text-3xl font-bold mb-6 text-gray-800">Cutting-Edge AI Research Tools</h2>
            <p class="text-gray-600 mb-8">Our platform integrates the latest AI technologies to help you analyze, understand, and apply research findings more effectively.</p>
            <ul class="space-y-4">
              <li class="flex items-start">
                <svg class="h-6 w-6 text-red-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700">Semantic paper search with NLP</span>
              </li>
              <li class="flex items-start">
                <svg class="h-6 w-6 text-red-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700">Automated research summaries</span>
              </li>
              <li class="flex items-start">
                <svg class="h-6 w-6 text-red-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700">Citation network visualization</span>
              </li>
              <li class="flex items-start">
                <svg class="h-6 w-6 text-red-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700">Research impact metrics</span>
              </li>
            </ul>
          </div>
          <div class="md:w-1/2 md:pl-10">
            <div class="bg-white p-4 rounded-xl shadow-lg overflow-hidden">
              <div class="bg-red-100 rounded-lg p-6">
                <div class="flex items-center mb-4">
                  <div class="bg-red-700 h-3 w-3 rounded-full mr-2"></div>
                  <div class="bg-yellow-500 h-3 w-3 rounded-full mr-2"></div>
                  <div class="bg-green-500 h-3 w-3 rounded-full"></div>
                </div>
                <div class="bg-white rounded-lg p-4 shadow">
                  <div class="h-8 bg-gray-200 rounded w-full mb-4"></div>
                  <div class="h-32 bg-gray-100 rounded w-full mb-4"></div>
                  <div class="flex justify-between">
                    <div class="h-6 bg-red-200 rounded w-1/3"></div>
                    <div class="h-6 bg-red-300 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">Trusted by AI Researchers Worldwide</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div class="flex items-center mb-4">
              <div class="h-12 w-12 rounded-full bg-red-200 flex items-center justify-center text-red-700 font-bold text-xl">JD</div>
              <div class="ml-4">
                <h4 class="font-semibold">Dr. Jane Doe</h4>
                <p class="text-gray-500 text-sm">AI Researcher, Tech University</p>
              </div>
            </div>
            <p class="text-gray-600">"CoreAI has revolutionized how our team discovers and analyzes new research. The semantic search functionality saves us hours of manual review."</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div class="flex items-center mb-4">
              <div class="h-12 w-12 rounded-full bg-red-200 flex items-center justify-center text-red-700 font-bold text-xl">MS</div>
              <div class="ml-4">
                <h4 class="font-semibold">Mark Smith</h4>
                <p class="text-gray-500 text-sm">Lead Data Scientist, AI Labs</p>
              </div>
            </div>
            <p class="text-gray-600">"The collaboration tools have been game-changing for our distributed research team. We can now seamlessly work across time zones."</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div class="flex items-center mb-4">
              <div class="h-12 w-12 rounded-full bg-red-200 flex items-center justify-center text-red-700 font-bold text-xl">AC</div>
              <div class="ml-4">
                <h4 class="font-semibold">Dr. Aria Chen</h4>
                <p class="text-gray-500 text-sm">Director of AI Research, InnovateAI</p>
              </div>
            </div>
            <p class="text-gray-600">"The visualization tools in CoreAI help us identify emerging research trends months before they become mainstream. Invaluable for our strategic planning."</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-gradient-to-r from-red-900 to-red-700 text-white">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-3xl font-bold mb-4">Ready to Transform Your AI Research?</h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto">Join thousands of researchers using coreAI to discover, analyze, and leverage cutting-edge AI developments.</p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <button class="bg-white text-red-700 px-6 py-3 rounded-lg font-medium text-lg hover:bg-red-100 transition">Start Free Trial</button>
          <button class="bg-red-800 border border-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-red-900 transition">Contact Sales</button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-300">
      <div class="container mx-auto px-6 py-10">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div class="flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
              </svg>
              <span class="font-bold text-lg text-white">coreAI</span>
            </div>
            <p class="text-sm">Next-generation AI research portal designed for researchers, data scientists, and AI enthusiasts.</p>
          </div>
          <div>
            <h3 class="font-semibold text-white mb-4">Product</h3>
            <ul class="space-y-2">
              <li><a href="#" class="hover:text-red-400 transition">Features</a></li>
              <li><a href="#" class="hover:text-red-400 transition">Pricing</a></li>
              <li><a href="#" class="hover:text-red-400 transition">API Access</a></li>
              <li><a href="#" class="hover:text-red-400 transition">Integrations</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-white mb-4">Resources</h3>
            <ul class="space-y-2">
              <li><a href="#" class="hover:text-red-400 transition">Documentation</a></li>
              <li><a href="#" class="hover:text-red-400 transition">Blog</a></li>
              <li><a href="#" class="hover:text-red-400 transition">Tutorials</a></li>
              <li><a href="#" class="hover:text-red-400 transition">Case Studies</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-white mb-4">Company</h3>
            <ul class="space-y-2">
              <li><a href="#" class="hover:text-red-400 transition">About Us</a></li>
              <li><a href="#" class="hover:text-red-400 transition">Careers</a></li>
              <li><a href="#" class="hover:text-red-400 transition">Contact</a></li>
              <li><a href="#" class="hover:text-red-400 transition">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p class="text-sm">© 2025 coreAI. All rights reserved.</p>
          <div class="flex space-x-4 mt-4 md:mt-0">
            <a href="#" class="text-gray-400 hover:text-red-400 transition">
              <span class="sr-only">Twitter</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-red-400 transition">
              <span class="sr-only">GitHub</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-red-400 transition">
              <span class="sr-only">LinkedIn</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: []
})
export class LandingPageComponent {
  title = 'coreAI';
}