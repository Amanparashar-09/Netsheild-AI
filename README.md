# 🛡️ NetShield AI

**Real-Time AI-Powered Network Intrusion Detection System**

NetShield AI is a full-stack, production-ready Network Intrusion Detection System (NIDS) that leverages machine learning to detect cyber attacks in real-time and visualizes them through a live dashboard. Built with modern web technologies and designed for performance, it enables live traffic monitoring, intelligent threat detection, and interactive security analytics.


---

## 🚀 Features

- 📡 **Real-time packet analysis** using Python + Scapy
- 🧠 **ML-powered intrusion detection** with a RandomForest model trained on NSL-KDD
- 📊 **Live React dashboard** with charts, maps, and alerts
- 🌐 **Geo-IP mapping** of malicious traffic sources
- 🔒 **Auto-blocking of malicious IPs**
- ⚙️ **Custom detection rules** for known attack patterns
- 📥 **Traffic simulator & sample attack generator**
- 🔔 **Real-time alerts & threat confidence levels**
- 📈 **Historical analytics & attack trends**
- 🎨 **Dark/light mode UI for SOC environments**

---

## 📁 Project Structure

How to run it on your systems

```bash
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to project folder
cd netshield-ai

# Step 3: Install dependencies
npm install

# Step 4: Start the dev server
npm run dev
```

Make changes locally and push to GitHub.

---

## 🧰 Tech Stack

- ⚡️ [Vite](https://vitejs.dev/)
- 🛠️ [TypeScript](https://www.typescriptlang.org/)
- ⚛️ [React](https://reactjs.org/)
- 🎨 [Tailwind CSS](https://tailwindcss.com/)
- 💎 [shadcn/ui](https://ui.shadcn.com/)
- 🔌 Supabase (PostgreSQL + Realtime + Edge Functions)
- 🤖 Python + Scapy + ML (RandomForest)

---

## 📊 ML Model

We use a RandomForest model trained on the **NSL-KDD** dataset. The model is hosted via **Supabase Edge Functions** and processes packet features in real time to detect:

- Normal Traffic ✅  
- DoS (Denial of Service) 🛑  
- Probe/Scan 📡  
- U2R (User to Root) 🧑‍💻  
- R2L (Remote to Local) 🔓

---

## 🤝 Contributing

Contributions are welcome! Please fork the repo, make your changes, and submit a pull request. Open issues or ideas in the Discussions tab to get feedback or support.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🧠 Credits

Developed by [Aman Parashar](https://github.com/Amanparashar-09) — combining knowledge in networking, machine learning, and full-stack development into a unique cybersecurity solution.

---

> ⚡ If you found this project interesting or useful, consider giving it a ⭐️ on GitHub!