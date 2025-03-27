// import { Github, Linkedin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";

const team = [
  {
    name: "Saurabh Maskara",
    role: "Developer",
    image:
      "/Saurabh.png",


  },
  {
    name: "Kevin Tan",
    role: "Developer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
  },
  {
    name: "Kendrick Poon",
    role: "Developer",
    image:
      "https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
  },
  {
    name: "Ryan Bangras",
    role: "Developer",
    image:
      "/Ryan.jpeg",
  },
  {
    name: "Ewan",
    role: "Developer",
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
  },
];

export default function Team() {
  return (
    <div className="max-w-7xl mx-auto py-24 lg:py-32">
      {/* Title */}
      <div className="text-center mb-10 lg:mb-14">
        <h2 className="text-3xl font-bold md:text-4xl md:leading-tight">
          Who's cooking up this idea?!
        </h2>
        <p className="mt-1 text-lg text-muted-foreground">Meet the brains behind the bites</p>
      </div>
      {/* End Title */}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 justify-items-center">
        {team.map((member) => (
          <div key={member.name} className="flex flex-col items-center">
            <Avatar className="w-20 h-20">
              <AvatarImage src={member.image} alt={member.name} />
              <AvatarFallback>{member.name[0]}</AvatarFallback>
            </Avatar>
            <div className="mt-4 text-center">
              <h3 className="font-medium">{member.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {member.role}
              </p>
            </div>
            {/* These were the GitHub and LinkedIn buttons below each team member
            <div className="mt-3 flex gap-2">
              <Button size="icon" variant="ghost">
                <Github className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost">
                <Linkedin className="w-4 h-4" />
              </Button>
            </div> */}
          </div>
        ))}
      </div>
      {/* End Grid */}
    </div>
  );
}
