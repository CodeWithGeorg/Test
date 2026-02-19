import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes/constants';
import Button from '../components/Button';
import Card from '../components/Card';

export default function Home() {
  const features = [
    {
      title: 'Academic Writing',
      description: 'Get professional help with essays, research papers, and assignments.',
      icon: '📝',
    },
    {
      title: 'Transcription Services',
      description: 'Accurate audio and video transcription for all your academic needs.',
      icon: '🎙️',
    },
    {
      title: 'Fast Delivery',
      description: 'Quick turnaround times to meet your deadlines.',
      icon: '⚡',
    },
    {
      title: 'Quality Guarantee',
      description: 'Expert writers and thorough quality checks.',
      icon: '✅',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Academic Writing & Transcription Services
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Simple MVP: clients upload assignments or audio. 
            Admin completes tasks and uploads final files.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={ROUTES.PLACE_ORDER}>
              <Button size="large" variant="secondary">
                Place Order
              </Button>
            </Link>
            <Link to={ROUTES.SIGNUP}>
              <Button size="large" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Place Your Order</h3>
              <p className="text-gray-600">
                Upload your assignment or audio file and describe your requirements.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">We Process</h3>
              <p className="text-gray-600">
                Our team works on your project with quality and speed.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Receive Result</h3>
              <p className="text-gray-600">
                Download your completed work and provide feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Join thousands of satisfied students who trust us with their academic work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={ROUTES.SIGNUP}>
              <Button size="large" variant="primary">
                Create Account
              </Button>
            </Link>
            <Link to={ROUTES.LOGIN}>
              <Button size="large" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-800">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
