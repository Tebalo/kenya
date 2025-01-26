'use client';
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';


export function Footer() {
  return (
    <>
      {/* CTA Section */}
      <div className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Shape the Future of Public Enterprises
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our pool of professionals and contribute to the transformation of Botswana&rsquo;s state-owned enterprises.
          </p>
          <Button size="lg">
            Submit Your Profile
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      </>
  );
}