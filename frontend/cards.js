// document.addEventListener('DOMContentLoaded', () => {
//     fetch('http://localhost:4500/employees')
//         .then(response => response.json())
//         .then(data => {
//             const container = document.getElementById('employee-container');
//             data.forEach(employee => {
//                 const card = document.createElement('div');
//                 card.className = 'card';
//                 card.innerHTML = `
//                     <h3>${employee.username}</h3>
//                     <p>Email: ${employee.email}</p>
//                     <p>Password: ${employee.password}</p>
//                 `;
//                 container.appendChild(card);
//             });
//         })
//         .catch(error => console.error('Error fetching data:', error));
// });

document.addEventListener('DOMContentLoaded', () => {
    const addNote = document.getElementById('note');
    if (addNote) {
        addNote.addEventListener('submit', async (e) => {
            e.preventDefault();
            const note = document.getElementById('noteInput').value;

            const response = await fetch('http://localhost:4500/addnote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ note })
            });

            const data = await response.json();
            alert(data.message);

            if (response.ok) {
                window.location.href = '/frontend/notes.html';
            }
        });
    }
})


document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:4500/shownotes')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('note-container');
            data.forEach(note => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <p> ${note.note}</p>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

// document.addEventListener('DOMContentLoaded', () => {
//     const authLink = document.getElementById('auth-link');

//     // Check login status (this is just a placeholder, replace with actual logic)
//     const isLoggedIn = false; // Change this based on your authentication logic

//     if (isLoggedIn) {
//         authLink.innerHTML = '<a href="logout.html">Logout</a>';
//     }
// });



async function saveNote() {
    const noteInput = document.getElementById('noteInput').value;

    if (noteInput.trim() === '') {
        alert('Please enter a note.');
        return;
    }

    const response = await fetch('http://localhost:4500/shownotes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ note: noteInput }),
    });

    if (response.ok) {
        document.getElementById('noteInput').value = '';
        loadNotes();
    } else {
        // alert('Failed to save note.');
    }
}

async function loadNotes() {
    const response = await fetch('http://localhost:4500/shownotes');
    const notes = await response.json();

    const notesContainer = document.getElementById('notesContainer');
    notesContainer.innerHTML = '';

    notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.innerText = note.content;
        notesContainer.appendChild(noteElement);
    });
}

window.onload = loadNotes;
