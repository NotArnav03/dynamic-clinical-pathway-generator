# 🚀 Quick Start Guide - Clinical Pathway Generator

## ✅ What's New

**Flowchart Integration Complete!**
- 9 symptom-specific Mermaid flowcharts integrated
- Visual decision trees for all pathways
- Backend + frontend fully connected
- All 9 symptoms tested and working

---

## 📋 To Run the Application

### Option 1: Using Batch Scripts (Easiest)

**1. Start Backend:**
```bash
cd backend
start_backend.bat
```

**2. Start Frontend:**
```bash
cd frontend  
start_frontend.bat
```

**3. Open Browser:**
```
http://localhost:5173
```

---

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
py api.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

---

## 🧪 Quick Test

1. Open http://localhost:5173
2. Fill in:
   - **Age:** 65
   - **Duration:** 2 hours
   - **Symptom:** Chest pain
   - **Severity:** Severe
3. Click "Generate Pathway"

**You should see:**
- ✅ Clinical Decision Flowchart (Mermaid diagram)
- ✅ Risk Assessment Chart (High Risk)
- ✅ LLM Explanation (in ChatBot)
- ✅ Patient Context Card

---

## 📁 Files Added/Changed

### New Components
- `frontend/src/components/MermaidFlowchart.jsx` - Renders flowcharts
- `backend/flowchart_mapper.py` - Maps symptoms to flowcharts
- `backend/test_flowchart.py` - Backend test script

### Flowchart Assets (9 files)
All in `frontend/public/flowcharts/`:
- chest-pain-flow.md
- fever-flow.md
- headache-flow.md
- shortness-of-breath-flow.md
- abdominal-pain-flow.md
- cough-flow.md
- diarrhea-flow.md
- urinary-pain-flow.md
- vomiting-flow.md

### Updated Files
- `backend/api.py` - Added flowchart to response
- `backend/pathway_service.py` - Integrated flowchart retrieval
- `frontend/src/App.jsx` - Displays flowcharts
- `frontend/package.json` - Added mermaid dependency

---

## ⚠️ Important Notes

### GROQ_API_KEY Required
Make sure you have `.env` file in backend with:
```
GROQ_API_KEY=your_key_here
```

Without it, the LLM explanation won't work (but flowcharts and pathways will).

### Mermaid Installation
If mermaid didn't install automatically, run:
```bash
cd frontend
npm install mermaid
```

---

## 🎯 All 9 Symptoms Supported

Each has its own flowchart showing decision logic:

1. ✅ Chest Pain
2. ✅ Fever
3. ✅ Headache
4. ✅ Shortness of Breath
5. ✅ Abdominal Pain
6. ✅ Cough
7. ✅ Diarrhea
8. ✅ Urinary Pain
9. ✅ Vomiting

---

## 🐛 Troubleshooting

**Backend won't start:**
- Check if port 8000 is free
- Verify .env file exists with GROQ_API_KEY

**Frontend won't start:**
- Run `npm install` in frontend folder
- Check if port 5173 is free

**Flowchart not showing:**
- Verify npm installed mermaid successfully
- Check browser console for errors
- Ensure flowchart files are in `frontend/public/flowcharts/`

**No LLM explanation:**
- Check GROQ_API_KEY in .env
- Verify backend console for API errors

---

## ✅ Status: FULLY FUNCTIONAL

All components tested and working:
- ✅ Backend API serving flowcharts
- ✅ Frontend rendering Mermaid diagrams
- ✅ All 9 symptoms have flowcharts
- ✅ No bugs found
- ✅ Clean file organization
- ✅ Duplicate files removed

**The application is production-ready!** 🎉
