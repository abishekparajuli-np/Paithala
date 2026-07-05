// Temporary script to create a doctor user using Firebase client SDK
const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, setDoc, serverTimestamp } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyBYpoN5HOPCySTkpR3ACIKxdZQD9q_l-io",
  authDomain: "ulcer-thermography.firebaseapp.com",
  projectId: "ulcer-thermography",
  storageBucket: "ulcer-thermography.firebasestorage.app",
  messagingSenderId: "1075028462605",
  appId: "1:1075028462605:web:885af588343696eaca9944",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function createDoctor() {
  const email = 'doctor@paithala.com';
  const password = 'paithala123';

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCred.user.uid;
    console.log(`✅ Auth user created — UID: ${uid}`);

    await setDoc(doc(db, 'users', uid), {
      name: 'Dr. Abishek',
      email: email,
      role: 'doctor',
      clinic: 'Paithala Clinic',
      createdAt: serverTimestamp(),
    });
    console.log('✅ Firestore /users doc created with role=doctor');
    console.log(`\n  Email:    ${email}`);
    console.log(`  Password: ${password}`);
    process.exit(0);
  } catch (err) {
    if (err.code === 'auth/email-already-in-use') {
      console.log('⚠️  Auth user already exists. Trying to sign in and ensure Firestore doc...');
      const { signInWithEmailAndPassword } = require('firebase/auth');
      try {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const uid = cred.user.uid;
        await setDoc(doc(db, 'users', uid), {
          name: 'Dr. Abishek',
          email: email,
          role: 'doctor',
          clinic: 'Paithala Clinic',
          createdAt: serverTimestamp(),
        });
        console.log(`✅ Firestore /users doc created/updated for UID: ${uid}`);
        console.log(`\n  Email:    ${email}`);
        console.log(`  Password: ${password}`);
        process.exit(0);
      } catch (signInErr) {
        console.error('❌ Sign-in failed:', signInErr.message);
        process.exit(1);
      }
    } else {
      console.error('❌ Error:', err.message);
      process.exit(1);
    }
  }
}

createDoctor();
