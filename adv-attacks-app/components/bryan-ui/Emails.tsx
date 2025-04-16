"use client";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const getInitials = (name?: string) => {
  if (!name) return "?";
  const parts = name.split(' ');
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || "?";
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
};

interface Email {
  id: number;
  fromName?: string;
  fromEmail?: string;
  toName?: string;
  toEmail?: string;
  subject?: string;
  date?: string;
  content: string;
  isIntroduction?: boolean;
  isFinalLetter?: boolean;
  isReply?: boolean;
  title?: string;
}

// Separate data for characters
const charactersData = [
  { name: "Alex", description: "Lives in Chapel Hill, NC, outside the immediate disaster zone." },
  { name: "Jay", description: "Lives in FL, representing the struggling lower class." },
  { name: "Jerome", description: "Lives in FL, representing the anxious middle class." },
  { name: "Max", description: "Lives in FL, representing the wealthy elite." },
];

const emailsData: Email[] = [
  {
    id: 0,
    isIntroduction: true,
    title: "Introduction",
    content: `In the creative universe of this project, a novel disease, P-25, has been reported as an epidemic raised not from a virus or bacteria, but from genetically altered plant pollen in Florida. What was previously just a seasonal distress became a perilous infection in the air, which was aggravated by the oppressive state humid climate and the government's indifference and elite-oriented response.

The solution to the disease problem came in the form of a high-tech protective mask. The beautiful, but poor, mask, whose price and limited availability soon turned it into a luxury article, a divider of society into those who could afford to breathe safely and those who had to choke in the open air.

This project unfolds through a series of email letters between four friends.

Through their correspondence, the project explores how a crisis exposes not only pathogens in the air, but also pathogens in the social fabric: inequality, moral disengagement, and the price of indifference.

Although the disease might only be our concept, the world portrayed in the stories certainly feels like it does not belong anywhere else than this subject. These are stories of fear, endurance, and intimate moments spent together between people who are separate from each other as their connection to the world around them is through systems that are meant to divide.`,
  },
  {
    id: 1,
    title: "Email 1 — \"It’s starting\"",
    fromName: "Jay",
    fromEmail: "jay@example.com",
    toName: "Alex",
    toEmail: "alex@example.com",
    date: "March 3",
    content: `Hey Alex,

Weird stuff happening down here. People are sneezing like crazy — not flu sneezes, more like… uncontrolled, almost panicked. They’re calling it the Verdant Drift. Some kind of pollen mutation, maybe? I don’t know. But it’s not normal.

Local news mentioned a federal emergency briefing, but nothing’s been made public yet. We’re in the dark. And now there’s talk of a “Class V Airborne Allergen Event” — whatever the hell that means.

They’ve started selling something called the FLORAMASK. $279.99. It’s supposedly “pollen-sealing and bio-sanitizing.” I’d laugh if it wasn’t so sad. That’s two weeks of groceries.

Anyway, just keeping you in the loop. If anything happens… you’ll know why.

– Jay`,
  },
  {
    id: 2,
    title: "Reply — \"They’re hiding something\"",
    isReply: true,
    fromName: "Alex",
    fromEmail: "alex@example.com",
    toName: "Jay",
    toEmail: "jay@example.com",
    date: "March 4",
    content: `Jay,

Jesus. I hadn’t heard much about this until now. It’s barely on the national news — just a scroll banner here and there. But I looked it up on some public health forums and… yeah, people are freaking out.

Did you see the new Airborne Risk Tier Act? Passed overnight. Apparently states can now designate “Green Zones” where only certified individuals with a verified FLORAMASK can enter. They’re claiming it’s “necessary to protect vital infrastructure.”

I hate how fast this stuff gets normalized. “Certified air quality citizen”? What even is that?

Stay safe. Seriously. Keep writing to me.

– Alex`,
  },
  {
    id: 3,
    title: "Email 2 — \"We’re disposable, huh?\"",
    fromName: "Jay",
    fromEmail: "jay@example.com",
    toName: "Alex",
    toEmail: "alex@example.com",
    date: "March 11",
    content: `Alex,

They opened a Green Zone 10 miles from me — guarded like a damn fortress. Residents with “tier-1 air clearance” can live and shop there. Others? Denied at the gates. I watched an old man cry trying to get his meds. A guard just pointed at the red sticker on his ID.

I tried to sign up for the FLORAMASK voucher program. You know what they asked? Proof of income under $18,000 and a clean housing record. So if your name ever got flagged for an unpaid bill or a noise complaint? Sorry. No mask.

It’s like they’re using the pollen as an excuse to draw new lines.

I’m coughing more. Breathing’s a chore. But I keep going to work — food distribution center. Boss says masks are “encouraged but not provided.”

We’re the ones they need to keep society running, but we’re the first ones they let rot.

I don’t know if this is fear or just rage.

– Jay`,
  },
  {
    id: 4,
    title: "Reply — \"This is bigger than pollen\"",
    isReply: true,
    fromName: "Alex",
    fromEmail: "alex@example.com",
    toName: "Jay",
    toEmail: "jay@example.com",
    date: "March 12",
    content: `Jay,

I’m shaking reading your email. Everything you’re describing — it’s like history on repeat. Disaster hits, and suddenly there’s a new way to divide people.

I just read that some counties are adopting the Clean Movement Act, which allows surveillance drones to monitor mask usage. Like that’s going to help anyone.

Meanwhile, I walk down Franklin Street here in Chapel Hill, and everyone’s masked up, shopping like nothing’s wrong. The privilege of distance, I guess.

Your anger? It's justified. I wish I could be there with you. Wish I could send a mask that actually works. Hell, I’d wear your cough if I could.

You matter, Jay. Even when the system tells you otherwise.

– Alex`,
  },
  {
    id: 5,
    title: "Email 3 — \"I stopped pretending\"",
    fromName: "Jay",
    fromEmail: "jay@example.com",
    toName: "Alex",
    toEmail: "alex@example.com",
    date: "March 25",
    content: `Alex,

It's gotten quieter here — not because it’s better, but because there’s no one left to make noise. Whole streets feel hollow. People stay inside or move in silence. The ones without masks… we just exist on the edge.

I used to try and act normal. Smile at neighbors. Say things like “we’ll get through this.” But I stopped pretending. What’s the point?

A friend of mine, Mya, died three days ago. She’d been saving up for the FLORAMASK. $20 a week. She was one payment away.

I’ve been using a piece of a car air filter, tied to my face with shoelaces. It doesn’t work, but it feels like doing something.

I'm not writing this for pity. I just… I don’t want to disappear without someone knowing I was here.

– Jay`,
  },
  {
    id: 6,
    title: "Reply — \"You’re not invisible\"",
    isReply: true,
    fromName: "Alex",
    fromEmail: "alex@example.com",
    toName: "Jay",
    toEmail: "jay@example.com",
    date: "March 26",
    content: `Jay,

You are not invisible. I read every word you write like it’s a lifeline — not just for you, but for me too.

There are protests starting here. Not huge, not loud yet. But people are gathering — demanding equitable access to the FLORAMASK, calling out the Zone Restrictions. I’m going next week. I’ll hold your name on a sign.

I wish I could give you more than words, but maybe words are the beginning.

Keep writing. I’m right here.

– Alex`,
  },
  {
    id: 7,
    title: "Final Letter — \"I just didn’t want to disappear\"",
    isFinalLetter: true,
    fromName: "Jay",
    fromEmail: "jay@example.com",
    toName: "The People",
    date: "May 17",
    content: `To whoever still listens,

His name was Jay.

He lived in northern Florida. He didn’t have much — a small apartment, a job sorting canned goods, a cough that got worse every week. But he had words. And those words were the only thing keeping him alive — and keeping me honest.

Jay and I wrote emails when the pollen started. When the government called it a “Class V Floral Disturbance” and the markets hiked up the price of breath. When they invented the FLORAMASK and sold it like salvation.

He said:

“We’re the ones they need to keep society running, but we’re the first ones they let rot.”

He said:

“They turned safety into a membership club.”

He said:

“I just don’t want to disappear without someone knowing I was here.”

And then — he disappeared.

I sent emails. Dozens. No reply.

I don’t know where Jay is. I don’t know if he’s alive. But I know he matters. And I know you’ve heard versions of him before — in bus stops, food banks, call center queues, coughing behind you in line.

So I’m publishing this. Every message he ever sent. His voice, unedited. His fear, his anger, his hope. Because Jay deserves more than silence. And so does every other soul this system deemed disposable.

If we forget him, we help bury him.

– Jay`,
  },
  {
    id: 8,
    title: "Letter from Max to Alex",
    fromName: "Max",
    fromEmail: "max@example.com",
    toName: "Alex",
    toEmail: "alex@example.com",
    date: "March 3",
    content: `Hi Alex,

I hope this email finds you well. Things here in Florida have been... well, to say the least, strange. As you might have heard, a new disease, P-25, has started to spread, and while the initial symptoms seemed like nothing more than bad allergies, the reality is much worse. People are dying. The mortality rate is apparently pretty high, but the government really hasn’t done much about it. However, we did find some specialized masks that could help with the issue.

On a more personal note, the disease hasn’t impacted me in any serious way, thankfully. I’m able to get my hands on the high-tech masks that everyone’s been raving about. They're not cheap by any chance, as I see so many people on the streets that have nothing covering their face. Also even with the production of these masks, the infected number is still growing like a rocketship. Still, it’s surreal to think that something as simple as pollen could be so deadly. Even though I completely understand why these masks are placed at such a ridiculous price, sometimes I really feel bad for those that can’t afford these masks, it’s almost like the disease was designed to target them.

I overheard some conversation the other day about how those without masks are being looked at with suspicion, and honestly, it’s almost like a strange social experiment. The divide is clear: the haves and the have-nots, all exposed in a way we never expected. The rich get the best protection, and the rest are left to fend for themselves. There’s talk about how people who can’t afford the masks are somehow ‘lesser’ or ‘dangerous,’ but it’s just an interesting commentary on how society handles a crisis like this. The wealthier you are, the less you have to worry about, while the poor are, as always, left vulnerable to whatever comes their way.

Anyway, I don’t mean to dwell on this too much, but it’s hard to ignore how much this has shifted everything. It’s like a new lens through which we’re all seeing the world. I’m curious to hear what your thoughts are on it, especially since you’re so far away from all of this.

How are things on your end? Do you feel like the pandemic is being handled any better over there? I’d love to hear your thoughts.

Stay safe and take care,

Best,
Max`,
  },
  {
    id: 9,
    title: "Reply from Alex to Max",
    isReply: true,
    fromName: "Alex",
    fromEmail: "alex@example.com",
    toName: "Max",
    toEmail: "max@example.com",
    subject: "Re: Things are getting strange",
    content: `Hey,

I’ve read your message a few times now, and I have to be honest — parts of it really unsettled me. Not because you’re wrong, but because of how right you are without realizing the weight of it.

You talk about all this — the masks, the divide, the way people without protection are treated — like it’s an interesting commentary. Like you’re watching it unfold from behind a glass wall. But for people like Jay, it’s not an observation. It’s survival.

I know you said you feel bad. But feeling bad isn’t enough when the systems are designed to leave people behind. Saying it seems like the disease targets the poor? It does. Because everything we’ve built, every policy we’ve normalized, makes it so.

You’re in a position to do something about it — to speak up, to push back, to share more than just sympathy. So I’m asking, as a friend: are you just going to keep watching? Or are you going to step out of the tower and do something?

This isn’t just a lens. It’s a mirror. What do you see in it?

– Alex`,
  },
  {
    id: 10,
    title: "Letter From Jerome to Alex",
    fromName: "Jerome",
    fromEmail: "jerome@example.com",
    toName: "Alex",
    toEmail: "alex@example.com",
    date: "March 3",
    content: `Hi [Friend’s Name],

I wanted to reach out and share what’s been going on here in Florida with the whole P-25 situation. It’s been such a rollercoaster, and honestly, it feels like everything is changing so fast. At first, we thought it was just some weird seasonal allergies—sneezing, runny noses, that kind of thing. But now? It’s terrifying. People are getting seriously sick. I know of at least three people who were healthy one day and then gone the next because their lungs filled with mucus. The disease is horrible, and even though the government is saying it’s not as bad as it really is, we all know the truth: it’s deadly, and it’s spreading fast.

The hardest part for me has been dealing with the masks. I’ve been trying to get my hands on one of those high-tech masks, but they’re ridiculously expensive. I’ve looked everywhere, online, in stores, but they’re sold out everywhere or priced so high that it’s impossible to afford. I don’t have the means to buy one, and to be honest, I’m scared. It feels like the disease is targeting people like me, the ones who can’t afford the proper protection.

I’ve been trying to work with a regular mask, but it’s just not the same, I’m afraid I could be the next one to be infected soon. It’s harsh. People look at you like you’re crazy if you’re not wearing a high-tech mask. And even if you are, there’s this feeling of separation now—like there’s a line between those who can protect themselves and those who can’t. It’s frustrating. It’s not just the mask situation—food prices are going up, and jobs are harder to come by. Some people are hoarding supplies, making it even harder for the rest of us.

I’ve talked to a few people, and we’re all on edge. Some think the government might have messed with genetically modified plants and that the disease could be part of some larger plan, maybe even biological warfare. I don’t know what to believe anymore. But I do know that it’s really dividing people in ways I’ve never seen before. It’s not just a health issue, it’s a class issue too. The masks, the resources, even just the ability to stay safe, it all comes down to how much money you have.

Looking forward to hearing from you

Stay safe,
Jerome`,
  },
  {
    id: 11,
    title: "Reply From Alex to Jerome",
    isReply: true,
    fromName: "Alex",
    fromEmail: "alex@example.com",
    toName: "Jerome",
    toEmail: "jerome@example.com",
    subject: "Re: I get it",
    content: `Hey,

Thank you for writing. I can feel the stress between your lines — and I hear you. Loud and clear.

What you said about being afraid of being “next”? That stays with me. Because fear like that doesn’t come from nowhere — it comes from seeing people like Jay getting sicker while the world pretends normal is still an option.

You're stuck in the middle, I know. You’re not rich enough to be safe, but not poor enough to be “seen” as a victim either. And that makes your position even more fragile, because you’re expected to hold it together without any help.

I’ve been writing to Jay. He’s… not okay. But he keeps writing, because I think he believes someone needs to know he existed. That someone still hears him.

You said this feels like something bigger than just a virus — and you’re right. This isn’t just about protection. It’s about who’s allowed to protect themselves at all.

Keep speaking up. I will too.

– Alex`,
  },
];

// Helper function to determine card classes based on email properties
const getCardClassName = (email: Email): string => {
  let baseClasses = "overflow-hidden rounded-lg shadow-sm";

  if (email.isReply) {
    baseClasses += " ml-6 border-l-4"; // Indent and thick left border
    if (email.isFinalLetter) {
      // Final Reply: Destructive color for all borders (left, top, right, bottom)
      baseClasses += " border-destructive border-t border-r border-b";
    } else {
      // Normal Reply: Primary left border, thin default top/right/bottom
      baseClasses += " border-primary border-t border-r border-b";
    }
  } else if (email.isFinalLetter) {
    // Final Non-Reply: Destructive border all around
    baseClasses += " border border-destructive";
  } else {
    // Normal Non-Reply: Default border all around
    baseClasses += " border";
  }

  return baseClasses;
};

export function Emails() {
  const intro = emailsData.find(email => email.isIntroduction);

  return (
    <div className="p-6 pt-6 max-w-4xl mx-auto space-y-6">
      {intro && (
        <div className="mb-8 p-6 border rounded-lg bg-card text-card-foreground shadow-sm space-y-4">
          <h1 className="text-2xl font-semibold leading-none tracking-tight">
            {intro.title || 'Introduction'}
          </h1>
          <Separator />
          {/* Render intro content paragraphs */}
          {intro.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-sm text-muted-foreground leading-relaxed">
              {paragraph}
            </p>
          ))}

          {/* Character section */}
          <div className="pt-4">
            <h2 className="text-lg font-semibold mb-3">Characters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {charactersData.map((char) => (
                <div key={char.name} className="p-3 border rounded-md bg-muted/50">
                  <p className="font-medium text-sm text-card-foreground">{char.name}</p>
                  <p className="text-xs text-muted-foreground">{char.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Email Correspondence Section - moved finding intro outside the map */}
      {emailsData.length > 1 && ( // Only show header if there are actual emails
          <h2 className="text-xl font-semibold tracking-tight border-b pb-2 mb-4">Email Correspondence</h2>
      )}

      {emailsData.filter(email => !email.isIntroduction).map((email) => (
        <Card
          key={email.id}
          className={getCardClassName(email)} // Use the helper function
        >
          <CardHeader className="p-4 bg-muted/50">
            <div className="flex items-center space-x-3">
              <Avatar className="h-9 w-9 border"> 
                <AvatarFallback>{getInitials(email.fromName)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-card-foreground">
                  {email.subject || email.title || '(No Subject)'}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  <span className="font-medium">{email.fromName || 'Unknown Sender'}</span>
                  {email.fromEmail && ` <${email.fromEmail}>`}
                  {email.toName && ` to ${email.toName}`}
                </p>
              </div>
              <div className="text-xs text-muted-foreground whitespace-nowrap pl-2">
                {email.date}
              </div>
            </div>
          </CardHeader>
          <Separator/> 
          <CardContent className="p-4">
            <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap"> 
              {email.content}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
