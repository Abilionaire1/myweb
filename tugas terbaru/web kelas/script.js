const students = [  
  { absen: 1, nis: "12530932", name: "Afni Nur Fadillah" },  
  { absen: 2, nis: "12530933", name: "Aina Kamalati Islam" },  
  { absen: 3, nis: "12530934", name: "Ainy Azahrine Zakiah" },  
  { absen: 4, nis: "12530935", name: "Ajeng Halimun Dwi Kusumo" },  
  { absen: 5, nis: "12530936", name: "Akmal Hafizh Yafii" },  
  { absen: 6, nis: "12530937", name: "Anggun Dwi Ramadhani" },  
  { absen: 7, nis: "12530938", name: "Arya Bagas" },  
  { absen: 8, nis: "12530939", name: "Bening Naydili" },  
  { absen: 9, nis: "12530940", name: "Christian Sutanto" },  
  { absen: 10, nis: "12530941", name: "Cindy Eka Putri Yulianto" },  
  { absen: 11, nis: "12530942", name: "Daffa Falih Ammar" },  
  { absen: 12, nis: "12530943", name: "Deswita Nur'adha" },  
  { absen: 13, nis: "12530944", name: "Dina Nazmiatun Sholekhah" },  
  { absen: 14, nis: "12530945", name: "Dwi Saifullah Aulianto" },  
  { absen: 15, nis: "12530946", name: "Ervina Lovi Yanda" },  
  { absen: 16, nis: "12530947", name: "Fadhil Zahir Ikhwan" },  
  { absen: 17, nis: "12530948", name: "Faris Isham Nugraha" },  
  { absen: 18, nis: "12530949", name: "Geisa Devi" },  
  { absen: 19, nis: "12530950", name: "Hafizah Nurul Hidayah" },  
  { absen: 20, nis: "12530951", name: "Jahrotun Alvia" },  
  { absen: 21, nis: "12530952", name: "Kanza Javas Putra Priyanto" },  
  { absen: 22, nis: "12530953", name: "Kevin Anas Chrisnandi" },  
  { absen: 23, nis: "12530954", name: "Lita Auliya" },  
  { absen: 24, nis: "12530955", name: "Mohamad Jibril" },  
  { absen: 25, nis: "12530956", name: "Muhamad Alfin Maulana" },  
  { absen: 26, nis: "12530957", name: "Muhamad Ario Aditra" },  
  { absen: 27, nis: "12530958", name: "Nimas Ayu Ainaura Husein" },  
  { absen: 28, nis: "12530959", name: "Nizar Pranawanda" },  
  { absen: 29, nis: "12530960", name: "Nur Aissyifah" },  
  { absen: 30, nis: "12530961", name: "Rakha Pamungkas Ahyani" },  
  { absen: 31, nis: "12530962", name: "Rizky Azzamy Nurdiansyah" },  
  { absen: 32, nis: "12530963", name: "Sabilla Atikah Zahroh" },  
  { absen: 33, nis: "12530964", name: "Salma Aulia" },  
  { absen: 34, nis: "12530965", name: "Widia Rika Lestari" },  
  { absen: 35, nis: "12530966", name: "Yaffa Reina Aurellia" },  
  { absen: 36, nis: "12530967", name: "Zifarah Indah Fajrulhayatie" }  
];  
   
document.addEventListener("DOMContentLoaded", () => {  
  const studentsGrid = document.getElementById("studentsGrid");  
  const searchInput = document.getElementById("studentSearch");  
 
  function renderStudents(list) {  
    studentsGrid.innerHTML = "";  
    list.forEach(student => {  
      const card = document.createElement("div");  
      card.classList.add("student-card");  
      card.innerHTML = `  
        <h4>Absen ${student.absen}</h4>  
        <p>${student.name}</p>  
        <small>NIS: ${student.nis}</small>  
      `;  
      studentsGrid.appendChild(card);  
    });  
  }  

  renderStudents(students);  
   
  searchInput.addEventListener("input", () => {  
    const query = searchInput.value.toLowerCase();  
    const filtered = students.filter(student =>   
      student.name.toLowerCase().includes(query)  
    );  
    renderStudents(filtered);  
  });  
});


