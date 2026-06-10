# 🛰️ AstroMonitor — Sistema Inteligente de Monitoramento Ambiental com Dados Satelitais

**Global Solution 2026.1 — FIAP | Graduação em Inteligência Artificial**

[![Open in Streamlit](https://static.streamlit.io/badges/streamlit_badge_black_white.svg)](https://astromonitor-dfjfv9n7qxdqca9v4ecrdo.streamlit.app/)

🔗 **Dashboard online:** https://astromonitor-dfjfv9n7qxdqca9v4ecrdo.streamlit.app/

> Prova de Conceito (POC) que une dados satelitais abertos da NASA/ESA, Machine Learning, sensores ESP32 e Visão Computacional para prever risco de queimadas e secas no Brasil.

---

## 👥 Integrantes do Grupo

| Nome                                  | RM       |
| ------------------------------------- | -------- |
| Leandro Tenório da Silva              | RM572083 |
| Pedro Henrique Lima Schneider         | RM573999 |
| Joao Pedro Lurovschi de Almeida Bessa | RM570160 |
| Nícolas Xavier Costa                  | RM570336 |
| Diego Alexandre Lemos Nobrega         | RM572085 |

---

## 🎯 Proposta

Regiões remotas do Brasil carecem de sistemas de alerta antecipado para queimadas e secas. O **AstroMonitor** consolida em uma única plataforma:

- 🌎 Dados de satélite e clima (NASA POWER, NASA FIRMS, NDVI/MODIS real, OMPS aerossol, OpenWeatherMap)
- 🤖 Modelo **preditivo** (Random Forest **vs.** Gradient Boosting) com features temporais — risco **Baixo / Médio / Alto** no horizonte de ~48 h
- 📡 Leituras locais de sensores físicos via ESP32 — DHT22 + MQ-135 + BMP280 (ou simulador)
- 🖼️ Análise de imagens NDVI com Visão Computacional (segmentação, detecção de fumaça e mapa de calor)
- 📊 Dashboard com **mapa de risco por região**, séries temporais e painel de alertas
- ⏱️ **Monitoramento periódico** contínuo (scheduler) com sondagem por cadência de cada fonte

---

## 🧩 Integração de Disciplinas (Fases 3 e 4)

| Disciplina                    | Onde aparece no projeto                                                    |
| ----------------------------- | -------------------------------------------------------------------------- |
| **Python / Análise de Dados** | `src/coleta/` — coleta multi-fonte + `notebooks/` — EDA com Pandas/Seaborn |
| **Banco de Dados**            | `src/banco/` — backend triplo **PostgreSQL/Supabase · Oracle · SQLite** (5 tabelas + migrações) |
| **Machine Learning**          | `src/ml/` — Random Forest vs. Gradient Boosting + feature engineering      |
| **Visão Computacional**       | `src/visao/` — NDVI com OpenCV + PIL (seca, fumaça, mapa de calor)         |
| **IoT / ESP32**               | `src/iot/` — MicroPython (DHT22+MQ-135+BMP280) + simulador + receptor MQTT |

---

## 🌟 Diferenciais de Inovação

O que distingue o AstroMonitor de um painel de risco convencional:

- **🔬 Validação com dados reais do INPE + backtest** (`src/ml/inpe_real.py`) — modelo
  treinado em **~273 mil focos reais** do BDQueimadas (2024) com **validação temporal**.
  No backtest do desastre do **Pantanal 2024**, sinalizou risco **Alto já em maio** —
  ~1 mês antes da explosão de focos e ~3 meses antes do pico (`assets/backtest_pantanal.png`).
- **🫁 Do satélite à saúde pública** (`src/saude/`) — converte a fumaça satelital (OMPS) em
  **PM2,5 estimado** (padrão CONAMA 491/2018) e cruza com a população vulnerável (crianças
  < 5 e idosos > 60), estimando quantas pessoas estão expostas por região.
- **🤖 IA generativa para a Defesa Civil** (`src/ia/`) — agente que gera um **briefing
  acionável** em linguagem natural, com fallback resiliente: Claude API → **Ollama local
  (grátis)** → template offline.

---

## 📁 Estrutura do Repositório

```
astromonitor/
├── main.py                       # Orquestrador do pipeline completo
├── testar_oracle.py              # Testa a conexão com o Oracle da FIAP
├── requirements.txt              # Dependências essenciais (app + pipeline + dashboard)
├── requirements-extra.txt        # Dependências opcionais (Oracle, MQTT, scheduler, notebooks)
├── README.md
├── src/
│   ├── coleta/
│   │   ├── coletor.py            # NASA POWER, FIRMS, OpenWeather, NDVI (fallback offline)
│   │   └── mqtt_receptor.py      # Recebe leituras do ESP32 via MQTT e grava no banco
│   ├── banco/
│   │   ├── database.py           # Roteia o backend (5 tabelas + migrações)
│   │   ├── database_postgres.py  # Backend PostgreSQL / Supabase (nuvem)
│   │   └── database_oracle.py    # Backend Oracle da FIAP
│   ├── ml/
│   │   ├── modelo_risco.py       # Modelo operacional (RF vs. Gradient Boosting)
│   │   └── inpe_real.py          # Treino com dados REAIS do INPE + backtest Pantanal
│   ├── saude/risco_respiratorio.py # Fumaça satelital -> PM2,5 -> população vulnerável
│   ├── ia/briefing.py            # IA generativa: briefing p/ Defesa Civil (Ollama/Claude)
│   ├── visao/analise_ndvi.py     # Visão Computacional (OpenCV + PIL)
│   ├── iot/
│   │   ├── esp32_sensor.py       # Código MicroPython (DHT22 + MQ-135 + BMP280)
│   │   └── simulador.py          # Simulador para uso sem hardware
│   ├── scheduler/monitor.py      # Monitoramento periódico (APScheduler)
│   └── dashboard/app.py          # Dashboard Streamlit (mapa de risco + gráficos)
├── sql/oracle_schema.sql         # Schema das tabelas no Oracle (criação manual alternativa)
├── data/                         # Banco de dados gerado (gitignored)
├── assets/                       # Imagens da visão computacional
│   └── ndvi_input/               # (opcional) imagens NDVI reais a processar
├── docs/                         # PDF da entrega (Global Solution)
└── notebooks/
    └── analise_exploratoria.ipynb # Análise exploratória (Pandas/Seaborn)
```

---

## ▶️ Como Executar

### 1. Instalar dependências

```bash
pip install -r requirements.txt          # essencial (app + pipeline + dashboard)
pip install -r requirements-extra.txt     # recursos locais: Oracle, MQTT, scheduler, notebooks
```

### 2. Rodar o pipeline completo

```bash
python main.py
```

Isso vai: inicializar o banco → coletar dados → simular sensores → treinar/rodar o modelo de ML → gerar alertas → analisar imagem NDVI.

### 3. Abrir o dashboard

```bash
streamlit run src/dashboard/app.py
```

### (Opcional) Rodar módulos individualmente

```bash
python src/banco/database.py       # cria o banco
python src/ml/modelo_risco.py      # treina e compara RF x Gradient Boosting
python src/visao/analise_ndvi.py   # roda a visão computacional (3 imagens)
python src/iot/simulador.py        # simula leituras do ESP32
python src/coleta/mqtt_receptor.py # recebe leituras reais do ESP32 via MQTT
```

### Monitoramento periódico (sondagem contínua)

```bash
python src/scheduler/monitor.py          # roda continuamente (Ctrl+C para sair)
python src/scheduler/monitor.py --once   # roda 1 ciclo completo e sai
```

Sonda cada fonte na sua cadência: **focos FIRMS** a cada poucas horas e o **ciclo completo** (clima/NDVI/aerossol + predição) 1×/dia. Intervalos ajustáveis por `INTERVALO_FOCOS_MIN` e `INTERVALO_COMPLETO_MIN`.

### (Opcional) Chaves de API para dados reais

As fontes funcionam offline (simulação). Para usar dados **reais**, defina:

```bash
# Windows PowerShell
$env:FIRMS_MAP_KEY="sua_chave"          # https://firms.modaps.eosdis.nasa.gov/api/map_key/
$env:OPENWEATHER_API_KEY="sua_chave"    # https://openweathermap.org/api
```

> A NASA POWER e o **NDVI real (NASA GIBS/MODIS)** **não exigem chave** — já vêm reais automaticamente.
> Para usar suas próprias imagens NDVI, basta colocá-las em `assets/ndvi_input/`.

---

## 🗄️ Banco de Dados — Backend triplo

O mesmo código roda em **três bancos** sem alterações, escolhido por variável de
ambiente (prioridade nesta ordem):

| Prioridade | Backend | Quando é usado | Variável |
| ---------- | ------- | -------------- | -------- |
| 1º | **PostgreSQL (Supabase)** | Deploy na nuvem (persistente, acessível externamente) | `DATABASE_URL` |
| 2º | **Oracle (FIAP)** | Ambiente acadêmico da FIAP | `ORACLE_USER` / `ORACLE_PASSWORD` |
| 3º | **SQLite** | Padrão local/offline (sem configuração) | — |

A API (`src/banco/database.py`) é idêntica nos três; os backends ficam em
`database_postgres.py`, `database_oracle.py` e no próprio `database.py`.

### Opção A — PostgreSQL na nuvem (Supabase) — recomendado para o deploy

1. Crie um projeto gratuito em [supabase.com](https://supabase.com) e copie a
   connection string da aba **Session pooler** (compatível com IPv4).
2. No `.env` local **ou** nos *Secrets* do Streamlit Cloud, defina:
   ```bash
   DATABASE_URL=postgresql://postgres.SEU_REF:SENHA@aws-0-REGIAO.pooler.supabase.com:5432/postgres
   ```
   > Use senha só com letras/números — símbolos como `@` precisam ser codificados na URL.
3. Rode `python main.py` (cria as tabelas e popula). É o backend usado pelo
   dashboard publicado — os dados ficam salvos e o app abre sem depender de botão.

### Opção B — Oracle da FIAP

Para usar o **Oracle da FIAP**, preencha o `.env` — o código passa a usar Oracle
automaticamente (desde que `DATABASE_URL` não esteja definido).

**1. Crie o `.env`** (copie de `.env.example`) e preencha:

```bash
ORACLE_USER=RM000000          # seu RM da FIAP (exemplo)
ORACLE_PASSWORD=sua_senha
ORACLE_DSN=oracle.fiap.com.br:1521/ORCL
```

**2. Teste a conexão:**

```powershell
python testar_oracle.py
```

**3. Rode o projeto** (cria as tabelas no seu schema e popula):

```powershell
python main.py
```

- O `.env` é ignorado pelo git (suas credenciais não vão para o repositório).
- As tabelas são criadas automaticamente (`init_db`). Como alternativa manual,
  rode `sql/oracle_schema.sql` no SQL Developer.
- **Oracle 11g** (driver em modo _thin_ não suporta 11g): instale o Oracle
  Instant Client e aponte `ORACLE_CLIENT_LIB` para a pasta dele:
  ```powershell
  $env:ORACLE_CLIENT_LIB="C:\oracle\instantclient_21_13"
  ```
  Para Oracle 12c/19c+ isso **não** é necessário.

---

## 🔌 Hardware (ESP32) — Opcional

A POC funciona **sem hardware** usando o simulador. Para usar o ESP32 real:

- **Componentes:** ESP32 + DHT22 (temp/umidade, GPIO4) + MQ-135 (qualidade do ar, GPIO34) + BMP280 (pressão, I2C SDA=21/SCL=22)
- Grave o MicroPython no ESP32 e suba `src/iot/esp32_sensor.py` como `main.py`
- Configure Wi-Fi e o IP do broker MQTT no início do arquivo
- No PC, rode `python src/coleta/mqtt_receptor.py` para receber e gravar as leituras

---

## 🛠️ Tecnologias

`Python` · `Pandas` · `NumPy` · `Scikit-learn` · `OpenCV` · `Pillow` · `Matplotlib` · `Seaborn` · `PostgreSQL (Supabase)` · `Oracle` · `SQLite` · `Streamlit` · `PyDeck` · `MicroPython` · `MQTT (paho)`

---

## 📡 Fontes de Dados (gratuitas)

- [NASA POWER](https://power.larc.nasa.gov/) — dados climáticos (não exige chave)
- [NASA FIRMS](https://firms.modaps.eosdis.nasa.gov/) — focos de incêndio
- [Copernicus / ESA](https://www.copernicus.eu/) — imagens NDVI
- [INPE BDQueimadas](https://terrabrasilis.dpi.inpe.br/queimadas/) — histórico nacional

---

## 🎥 Vídeo Demonstrativo

[Link do vídeo no YouTube — inserir após gravação]

---

_Projeto desenvolvido para a Global Solution 2026.1 da FIAP._
