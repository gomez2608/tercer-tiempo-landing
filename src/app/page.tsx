"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "./Header/header";
import Footer from "./Footer/footer";


export default function Home() {
  return (
    <>
      
      <Header />
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <h1 className="text-5xl font-bold text-gray-900">Bienvenido a tercer tiempo</h1>
        <p className="text-lg text-gray-600 mt-4">Build something amazing with us.</p>
        <Button className="mt-6 px-6 py-3 text-lg">Get Started</Button>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-6 p-6">
        <Card>
          <CardContent className="p-4 text-center">
            <h2 className="text-xl font-bold">Fast</h2>
            <p>Super quick setup and deployment.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <h2 className="text-xl font-bold">Secure</h2>
            <p>Enterprise-level security built-in.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <h2 className="text-xl font-bold">Customizable</h2>
            <p>Fully customizable components.</p>
          </CardContent>
        </Card>
      </section>

    <Footer />
      
    </>
  );
}
