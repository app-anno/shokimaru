#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const envPath = path.join(__dirname, '..', '.env.local');
const envExamplePath = path.join(__dirname, '..', '.env.local.example');

console.log('\n🚀 翔葵丸 - 環境変数セットアップ\n');

// .env.localが既に存在するかチェック
if (fs.existsSync(envPath)) {
  rl.question('.env.localが既に存在します。上書きしますか？ (y/N): ', (answer) => {
    if (answer.toLowerCase() !== 'y') {
      console.log('セットアップをキャンセルしました。');
      rl.close();
      return;
    }
    setupEnv();
  });
} else {
  setupEnv();
}

function setupEnv() {
  console.log('\nSupabaseプロジェクトを作成済みの場合は、以下の情報を入力してください。');
  console.log('まだ作成していない場合は、Enterキーを押してスキップしてください。\n');

  const questions = [
    {
      key: 'NEXT_PUBLIC_SUPABASE_URL',
      question: 'Supabase URL (例: https://xxxx.supabase.co): ',
      default: 'your_supabase_url_here'
    },
    {
      key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      question: 'Supabase Anon Key: ',
      default: 'your_anon_key_here'
    },
    {
      key: 'SUPABASE_SERVICE_ROLE_KEY',
      question: 'Supabase Service Role Key: ',
      default: 'your_service_key_here'
    },
    {
      key: 'BASIC_AUTH_USER',
      question: '管理画面のユーザー名 (デフォルト: admin): ',
      default: 'admin'
    },
    {
      key: 'BASIC_AUTH_PASSWORD',
      question: '管理画面のパスワード (デフォルト: shokimaru2024): ',
      default: 'shokimaru2024'
    },
    {
      key: 'NEXT_PUBLIC_GOOGLE_MAPS_API_KEY',
      question: 'Google Maps API Key (オプション): ',
      default: 'your_google_maps_api_key_here'
    }
  ];

  const envVars = {};
  let currentIndex = 0;

  function askQuestion() {
    if (currentIndex >= questions.length) {
      writeEnvFile(envVars);
      return;
    }

    const { key, question, default: defaultValue } = questions[currentIndex];
    
    rl.question(question, (answer) => {
      envVars[key] = answer || defaultValue;
      currentIndex++;
      askQuestion();
    });
  }

  askQuestion();
}

function writeEnvFile(envVars) {
  const content = Object.entries(envVars)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  fs.writeFileSync(envPath, content);
  
  console.log('\n✅ .env.localファイルを作成しました！');
  console.log('\n📝 次のステップ:');
  console.log('1. Supabaseでプロジェクトを作成（まだの場合）');
  console.log('2. docs/SUPABASE_SETUP.mdの手順に従ってセットアップ');
  console.log('3. .env.localファイルを正しい値で更新');
  console.log('4. npm run dev で開発サーバーを起動\n');
  
  rl.close();
}