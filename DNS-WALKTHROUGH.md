# DNS Walkthrough — Explained for Non-Technical People

This document explains what happens when someone types your website address into a browser. Written for a non-technical reader — no jargon, plain English.

---

## What is DNS?

DNS stands for **Domain Name System**. It is the **phone book of the internet**.

Computers talk to each other using numbers (called IP addresses), like `76.76.21.21`. But numbers are hard for humans to remember. DNS is the service that translates a friendly name like `aisha-siddiqui-portfolio.vercel.app` into the number the browser actually needs.

Think of it this way:

- You call your friend by name ("Ali") — that's the website name.
- Your phone book looks up Ali's number — that's DNS.
- Your phone dials the number — that's the browser connecting to the hosting server.

---

## What happens when someone types my website address?

Here is the exact journey, step by step:

```
User's Browser
    │  1. "Where is aisha-siddiqui-portfolio.vercel.app?"
    ▼
DNS Resolver (usually your internet provider's computer)
    │  2. "I don't know — let me ask the nameservers."
    ▼
Nameserver (the official DNS record holder)
    │  3. "It points to the hosting server at 76.76.21.21."
    ▼
DNS Record (the actual answer stored in the nameserver)
    │  4. "Here is the server address you asked for."
    ▼
Hosting Server (Vercel)
    │  5. "I have the website — sending it back now."
    ▼
Website Response (the page appears in the browser)
```

Let me explain each step in simple terms:

1. **User's Browser** — Someone types `https://aisha-siddiqui-portfolio.vercel.app` and presses Enter.

2. **DNS Resolver** — The browser first asks a "resolver" (usually your internet provider's computer): *"Do you know where this website lives?"* The resolver checks its own cache first. If it already looked this up recently, it answers immediately. If not, it moves to step 3.

3. **Nameserver** — The resolver asks the **authoritative nameserver** — the computer that is the official, trusted owner of the DNS records for that address. For a `.vercel.app` address, this is Vercel's nameserver.

4. **DNS Record** — The nameserver looks through its records and finds the **DNS record** for that name. The record says: *"This name points to server address 76.76.21.21."* This is the key answer.

5. **Hosting Server** — Now the browser knows the real server address. It sends a request to that server (in our case, Vercel's server that holds the built website files).

6. **Website Response** — The server sends back the website's files (HTML, CSS, JavaScript, images). The browser puts them together and shows the page.

All of this happens in a fraction of a second, and the browser even remembers the answer for a while (caching), so it doesn't have to ask again every single time.

---

## What is a CNAME record?

A **CNAME record** (Canonical Name record) is a DNS record that says:

> "This address is actually another address. Go look up that one instead."

It is like a forwarding address at the post office: *"This mailbox belongs to that building — deliver there."*

### What it looks like

```
Name                          Type    Value                          TTL
aisha-siddiqui-portfolio      CNAME   cname.vercel-dns.com           60
```

### What it points to

For a Vercel website with a custom domain (for example, if you owned `aishasiddiqui.com`), the CNAME record points **to Vercel's servers** (`cname.vercel-dns.com`). The value tells the DNS system: *"When someone asks for my custom domain, send them to Vercel's servers, which host my site."*

### Why it is used for custom domains

There are three reasons:

1. **You don't need to know server IP numbers.** Vercel can change its server addresses behind the scenes, and your CNAME still works because it points to Vercel's *name*, not a fixed number.

2. **One record, many destinations.** A CNAME can point to any other domain, so you can map `aishasiddiqui.com` to your portfolio with one line instead of maintaining a list of IP addresses.

3. **It enables HTTPS and scaling.** Because traffic flows through Vercel's infrastructure, Vercel can issue and renew the SSL certificate (the lock icon) automatically and route visitors to the nearest server worldwide.

### Important note

`vercel.app` subdomains (like the one your site currently uses) do **not** need a CNAME — Vercel manages those records automatically when you create the project. A CNAME only becomes relevant if you add your **own custom domain** (for example `aishasiddiqui.com`) later. When you do, you simply add the CNAME above to your domain registrar's DNS panel, and within minutes your custom domain will load your site.

---

## Quick summary table

| Term | Meaning | Plain-English analogy |
| --- | --- | --- |
| DNS | Domain Name System | The internet's phone book |
| DNS Resolver | First stop that looks up a name | A receptionist who looks up a phone number |
| Nameserver | Official record holder for a domain | The company that owns the master directory |
| DNS Record | The actual "this name = this server" entry | A single line in the directory |
| Hosting Server | The computer holding your website files | The building your friend actually lives in |
| Website Response | The files returned to the browser | The friend answering the call |
| CNAME record | "This name points to another name" | A forwarding address |

---

## Your site in practice

- **Your current live URL:** `https://aisha-siddiqui-portfolio.vercel.app`
- **Hosted on:** Vercel (free Hobby plan)
- **DNS type:** Managed automatically by Vercel (`.vercel.app` domain — no CNAME needed)
- **HTTPS:** Enabled automatically with a free SSL certificate (the padlock icon)
