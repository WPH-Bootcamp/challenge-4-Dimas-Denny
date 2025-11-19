const prompt = require("prompt-sync")({ sigint: true });

let todos = [];

function generateUniqueId() {
  // TODO: Implementasi fungsi untuk menghasilkan ID unik
  // Ini akan digunakan secara internal untuk setiap objek to-do
  // Contoh: Gabungan waktu saat ini dan angka acak
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomStr}`;
}

function addTodo() {
  // TODO: Implementasi logika untuk menambah to-do baru
  // 1. Minta input teks to-do dari user menggunakan `prompt()`
  // 2. Validasi input: Pastikan teks tidak kosong atau hanya spasi
  // 3. Buat objek to-do baru dengan properti: id (dari generateUniqueId), text, dan isCompleted (boolean, default false)
  // 4. Tambahkan objek to-do ini ke array `todos`
  // 5. Beri feedback ke user bahwa to-do berhasil ditambahkan
  const text = prompt("Masukkan To-do:");

  if (!text.trim()) {
    console.log("To-do tidak boleh kosong.");
    return;
  }

  const todo = {
    id: generateUniqueId(),
    text,
    isCompleted: false,
  };

  todos.push(todo);
  console.log(`Ditambahkan: "${text}"`);
}

function markTodoCompleted() {
  // TODO: Implementasi logika untuk menandai to-do sebagai selesai
  // 1. Panggil `listTodos()` untuk menampilkan daftar to-do
  // 2. Minta user memasukkan NOMOR to-do yang ingin ditandai sebagai selesai
  // 3. Validasi input: Pastikan nomor adalah angka, dalam rentang yang valid (1 sampai jumlah to-do)
  // 4. Ubah properti `isCompleted` dari to-do yang dipilih menjadi `true`
  // 5. Beri feedback ke user bahwa to-do berhasil ditandai selesai
  // 6. Tangani kasus jika to-do sudah selesai
  if (todos.length === 0) {
    console.log("Tidak ada yang ditandai.");
    return;
  }

  listTodos();

  const input = prompt("Masukkan nomor to-do yang ditandai selesai:");
  const num = parseInt(input);

  if (isNaN(num) || num < 1 || num > todos.length) {
    console.log("Invalid!");
    return;
  }

  const todo = todos[num - 1];

  if (todo.isCompleted) {
    console.log(`To-do "${todo.text}" sudah selesai.`);
    return;
  }

  todo.isCompleted = true;
  console.log(`To-do "${todo.text}" ditandai selesai.`);
}

function deleteTodo() {
  // TODO: Implementasi logika untuk menghapus to-do
  // 1. Panggil `listTodos()` untuk menampilkan daftar to-do
  // 2. Minta user memasukkan NOMOR to-do yang ingin dihapus
  // 3. Validasi input: Pastikan nomor adalah angka, dalam rentang yang valid
  // 4. Hapus to-do yang dipilih dari array `todos`
  // 5. Beri feedback ke user bahwa to-do berhasil dihapus
  if (todos.length === 0) {
    console.log("Tidak ada to-do untuk dihapus.");
    return;
  }

  listTodos();

  const input = prompt("Masukkan nomor to-do yang mau dihapus:");
  const num = parseInt(input);

  if (isNaN(num) || num < 1 || num > todos.length) {
    console.log("Invalid!");
    return;
  }

  const removed = todos.splice(num - 1, 1)[0];
  console.log(`To-do "${removed.text}" dihapus.`);
}

function listTodos() {
  // TODO: Implementasi logika untuk menampilkan semua to-do
  // 1. Tampilkan judul daftar (misal: "--- YOUR TO-DO LIST ---")
  // 2. Cek apakah array `todos` kosong. Jika ya, tampilkan pesan "No to-dos to display."
  // 3. Jika tidak kosong, iterasi (loop) melalui array `todos`
  // 4. Untuk setiap to-do, tampilkan nomor urut, status ([DONE] atau [ACTIVE]), dan teks to-do
  //    Contoh format: "1. [ACTIVE] | Belajar JavaScript"
  // 5. Tampilkan garis penutup daftar
  console.log("\n--- YOUR TO-DO LIST ---");

  if (todos.length === 0) {
    console.log("(empty)");
    console.log("-----------------------\n");
    return;
  }

  todos.forEach((todo, index) => {
    const status = todo.isCompleted ? "[DONE]" : "[ACTIVE]";
    console.log(`${index + 1}. ${status} | ${todo.text}`);
  });

  console.log("-----------------------\n");
}

function runTodoApp() {
  // TODO: Implementasi logika utama aplikasi (menu interaktif)
  // Ini adalah "otak" aplikasi yang terus berjalan sampai user memilih untuk keluar
  console.log("===== INTERACTIVE TO-DO LIST =====");

  let running = true;
  while (running) {
    // 1. Tampilkan menu perintah yang tersedia (add, complete, delete, list, exit)
    // 2. Minta user memasukkan perintah menggunakan `prompt()`
    // 3. Gunakan `switch` statement atau `if/else if` untuk memanggil fungsi yang sesuai
    //    berdasarkan perintah yang dimasukkan user
    // 4. Tangani perintah 'exit' untuk menghentikan loop aplikasi
    // 5. Tangani input perintah yang tidak valid
    console.log(`
 Choose an action:
 1. Tambahkan To-Do
 2. Tandai To-Do Yang Selesai
 3. Hapus To-Do
 4. Tampilkan Semua To-Do
 5. Exit
  `);

    const choice = prompt("Masukkan Pilihan Kamu (1-5): ");

    switch (choice) {
      case "1":
        addTodo();
        break;

      case "2":
        markTodoCompleted();
        break;

      case "3":
        deleteTodo();
        break;

      case "4":
        listTodos();
        break;

      case "5":
        running = false;
        console.log("Exiting app...");
        break;

      default:
        console.log("Invalid! Masukkan 1-5.");
    }
  }
}

// Jangan ubah bagian di bawah ini. Ini adalah cara Node.js menjalankan fungsi utama
// dan mengekspor fungsi-fungsi untuk pengujian (jika nanti ada).

if (require.main === module) {
  runTodoApp();
}

module.exports = {
  todos,
  generateUniqueId,
  addTodo,
  markTodoCompleted,
  deleteTodo,
  listTodos,
  runTodoApp,
};
