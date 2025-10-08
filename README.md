<div align="center">
  
  <img width="128" height="128" alt="scribenote2" src="https://github.com/user-attachments/assets/14059f51-e58d-4815-a1a3-96f1399430aa" />

</div>

<div align="center">
  
  # ScribeNote 2.0
  
</div>

<div align="center">  
  
  ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
  ![Tauri](https://img.shields.io/badge/tauri-%2324C8DB.svg?style=for-the-badge&logo=tauri&logoColor=%23FFFFFF)
   
</div>

## 📄 Description
Aplikasi web dan desktop untuk membuat Catatan Tempel (<i>Sticky Notes</i>). Dibuat dengan menggunakan Vanilla Javascript dan framework Tauri.

### ⚡ Fitur
- <strong>➕ Membuat Sticky Notes</strong>  
Buat dan simpan catatan penting dengan bentuk <i>Sticky Notes</i>. Tulis catatan dalam format `markdown*`
- <strong>🛃 Kustomisasi Sticky Ntes</strong>  
<i>Sticky Notes</i> yang dibuat dapat dikostumisasi dengan bebas baik warna latar, warna teks, serta letaknya.
- <strong>📦 Memanfaatkan Local Storage</strong>  
<i>Sticky Notes</i> yang dibuat akan selalu tersimpan pada <i>local storage</i> browser secara otomatis, dengan begitu catatan tidak akan hilang.
- <strong>💾 Simpan Sticky Notes</strong>  
<i>Sticky Notes</i> dapat disimpan dalam format gambar (.PNG) ke dalam direktori lokal.

###### <i>*Note: format markdown yang disupport dapat merujuk pada [marked](https://github.com/markedjs/marked) atau [turndown](https://github.com/mixmark-io/turndown)</i>


### 🌐 Demo
- Akses aplikasi desktop dapat didownload pada _**[COMING SOON]**_
- Akses aplikasi web dapat diakses pada _**[COMING SOON]**_

<hr>

## 📄 How To Install
Untuk menyimpan proyek berikut ke perangkat lokal, terdapat beberapa langkah berikut yang perlu dilakukan. Jalankan command berikut pada terminal untuk melakukan klon proyek di perangkat lokal:
```
git clone https://github.com/SoLiDinity/scribenotes-2.0.git
```

Pastikan untuk memiliki Node.js dan npm, kemudian jalankan command berikut untuk menginstall seluruh modul yang dibutuhkan pada `package.json` agar dapat menjalankan proyek dengan menjalankan command berikut:
```
npm i
```

<br>

### 🌐 ScribeNote 2.0 Web App
Jalankan mode developer sebagai aplikasi web menggunakan command berikut:
```
npm run start-dev
```

Jalankan build dan bundling aplikasi web menggunakan command berikut:
```
npm run build
```
Hasil dari build aplikasi web akan tersimpan pada direktori `/dist`. Jalankan tes dari hasil build menggunakan command berikut:
```
npm run serve
```

<br>

### 🖥️ ScribeNote 2.0 Desktop App
Jalankan mode developer sebagai aplikasi desktop menggunakan command berikut:
```
npm run tauri dev
```

Jalankan build dan bundling aplikasi desktop menggunakan command berikut:
```
npm run tauri build
```
Hasil dari build aplikasi desktop akan tersimpan pada `/src-tauri/target/release`. Dalam direktori ini akan terdapat file aplikasi yang telah dikompilasi dan siap untuk didistribusikan, termasuk file eksekusi (.exe di Windows, .app di macOS) pada atau paket instalasi pada direktori `/bundle`.

<hr>

## 📷 Preview

<img width="1920" height="1011" alt="Screenshot (202)" src="https://github.com/user-attachments/assets/a386e717-432c-41da-8dcf-bc73db988084" />
