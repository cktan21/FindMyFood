'use client'

import { useState } from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

// Type definitions
type Category = { name: string; icon: string };
type Restaurant = { name: string; rating: number; image: string };

const categories: Category[] = [
  { name: 'Pizza', icon: '🍕' },
  { name: 'Burger', icon: '🍔' },
  { name: 'Sushi', icon: '🍣' },
  { name: 'Salad', icon: '🥗' },
];

const restaurants: Restaurant[] = [
  { name: 'Pizzeria Deluxe', rating: 4.5, image: '/placeholder.svg?height=100&width=100' },
  { name: 'Burger Haven', rating: 4.2, image: '/placeholder.svg?height=100&width=100' },
  { name: 'Sushi Master', rating: 4.8, image: '/placeholder.svg?height=100&width=100' },
  { name: 'Green Leaf Salads', rating: 4.3, image: '/placeholder.svg?height=100&width=100' },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center py-24 lg:py-32">
<div className="min-h-screen bg-background flex flex-col items-center">
      <main className="container py-8 space-y-16">
        <section className="text-center space-y-4">
          <motion.h2
            className="text-4xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Delicious food, delivered to your door
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Order from your favorite restaurants with just a few taps
          </motion.p>
          <motion.div
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Search for restaurants or dishes"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </motion.div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold mb-4">Featured Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center hover:bg-accent transition-colors">
                  <CardContent className="p-4">
                    <div className="text-4xl mb-2">{category.icon}</div>
                    <h4 className="font-medium">{category.name}</h4>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold mb-4">Popular Restaurants</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {restaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <img src={restaurant.image || "/placeholder.svg"} alt={restaurant.name} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h4 className="font-semibold">{restaurant.name}</h4>
                      <p className="text-sm text-muted-foreground">Rating: {restaurant.rating}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="bg-accent rounded-lg p-8">
          <h3 className="text-2xl font-semibold mb-6 text-center">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Choose a restaurant', description: 'Browse our selection of top-rated restaurants' },
              { title: 'Select your meal', description: 'Pick your favorite dishes from the menu' },
              { title: 'Enjoy your food', description: 'We\'ll deliver your order right to your doorstep' },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="bg-background rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">{index + 1}</span>
                </div>
                <h4 className="font-semibold mb-2">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-muted py-8">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">© 2024 FoodieExpress. All rights reserved.</p>
        </div>
      </footer>
    </div>
    </section>
  );
}