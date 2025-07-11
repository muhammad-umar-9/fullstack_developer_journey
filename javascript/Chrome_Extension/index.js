let myLeads = []
let filteredLeads = []
let editingIndex = -1

// DOM elements
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const searchInput = document.getElementById("search-input")
const leadCountEl = document.getElementById("lead-count")
const exportBtn = document.getElementById("export-btn")

// Load leads from localStorage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    filteredLeads = myLeads
    render(filteredLeads)
}

// Initialize
updateLeadCount()

// Event listeners
tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const currentTab = tabs[0]
        const leadData = {
            url: currentTab.url,
            title: currentTab.title,
            date: new Date().toLocaleString()
        }
        
        myLeads.push(leadData)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        
        // Update filtered leads if no search is active
        if (!searchInput.value) {
            filteredLeads = myLeads
        } else {
            filterLeads()
        }
        
        render(filteredLeads)
        updateLeadCount()
        
        // success feedback
        showFeedback("Current tab saved successfully! 🎉")
    })
})

inputBtn.addEventListener("click", function() {
    const inputValue = inputEl.value.trim()
    
    if (inputValue) {
        const leadData = {
            url: inputValue,
            title: extractDomain(inputValue),
            date: new Date().toLocaleString()
        }
        
        myLeads.push(leadData)
        inputEl.value = ""
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        
        // Update filtered leads if no search is active
        if (!searchInput.value) {
            filteredLeads = myLeads
        } else {
            filterLeads()
        }
        
        render(filteredLeads)
        updateLeadCount()
        
        // Show success feedback
        showFeedback("Lead saved successfully! ✅")
    }
})

// Enter key support for input
inputEl.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        inputBtn.click()
    }
})

// Search functionality
searchInput.addEventListener("input", function() {
    filterLeads()
    render(filteredLeads)
})

// Double-click to delete all
deleteBtn.addEventListener("dblclick", function() {
    if (confirm("Are you sure you want to delete all leads? This action cannot be undone.")) {
        localStorage.clear()
        myLeads = []
        filteredLeads = []
        render(filteredLeads)
        updateLeadCount()
        showFeedback("All leads deleted! 🗑️")
    }
})

// Export functionality
exportBtn.addEventListener("click", function() {
    exportLeads()
})

function render(leads) {
    if (leads.length === 0) {
        ulEl.innerHTML = `
            <div class="no-leads">
                <div class="no-leads-icon">📋</div>
                <p>No leads saved yet</p>
                <p style="font-size: 12px; margin-top: 8px;">Add your first lead above!</p>
            </div>
        `
        return
    }
    
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        const lead = leads[i]
        const originalIndex = myLeads.findIndex(l => l.url === lead.url && l.date === lead.date)
        
        if (editingIndex === originalIndex) {
            listItems += `
                <li>
                    <div class="lead-item">
                        <input type="text" class="edit-input" value="${lead.url}" id="edit-input-${originalIndex}">
                        <div class="lead-date">${lead.date}</div>
                    </div>
                    <div class="lead-actions">
                        <button class="save-edit-btn" onclick="saveEdit(${originalIndex})">💾</button>
                        <button class="cancel-edit-btn" onclick="cancelEdit()">❌</button>
                    </div>
                </li>
            `
        } else {
            listItems += `
                <li>
                    <div class="lead-item">
                        <a class="lead-url" target='_blank' href='${lead.url}'>
                            ${lead.title || lead.url}
                        </a>
                        <div class="lead-date">${lead.date}</div>
                    </div>
                    <div class="lead-actions">
                        <button class="edit-btn" onclick="editLead(${originalIndex})">✏️</button>
                        <button class="delete-single-btn" onclick="deleteSingleLead(${originalIndex})">🗑️</button>
                    </div>
                </li>
            `
        }
    }
    ulEl.innerHTML = listItems
}

function filterLeads() {
    const searchTerm = searchInput.value.toLowerCase()
    filteredLeads = myLeads.filter(lead => 
        lead.url.toLowerCase().includes(searchTerm) || 
        (lead.title && lead.title.toLowerCase().includes(searchTerm))
    )
}

function updateLeadCount() {
    const count = myLeads.length
    leadCountEl.textContent = `${count} lead${count !== 1 ? 's' : ''} saved`
}

function extractDomain(url) {
    try {
        const domain = new URL(url).hostname
        return domain.replace('www.', '')
    } catch {
        return url.length > 30 ? url.substring(0, 30) + '...' : url
    }
}

function showFeedback(message) {
    // temporary feedback element
    const feedback = document.createElement('div')
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #48bb78;
        color: white;
        padding: 10px 16px;
        border-radius: 8px;
        font-size: 12px;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        animation: slideInRight 0.3s ease;
    `
    feedback.textContent = message
    document.body.appendChild(feedback)
    
    // Remove after 3 seconds
    setTimeout(() => {
        feedback.remove()
    }, 3000)
}

function deleteSingleLead(index) {
    if (confirm("Delete this lead?")) {
        myLeads.splice(index, 1)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        
        // Update filtered leads
        if (searchInput.value) {
            filterLeads()
        } else {
            filteredLeads = myLeads
        }
        
        render(filteredLeads)
        updateLeadCount()
        showFeedback("Lead deleted! 🗑️")
    }
}

function editLead(index) {
    editingIndex = index
    render(filteredLeads)
    
    // Focus on edit input
    setTimeout(() => {
        const editInput = document.getElementById(`edit-input-${index}`)
        if (editInput) {
            editInput.focus()
            editInput.select()
        }
    }, 100)
}

function saveEdit(index) {
    const editInput = document.getElementById(`edit-input-${index}`)
    const newUrl = editInput.value.trim()
    
    if (newUrl) {
        myLeads[index].url = newUrl
        myLeads[index].title = extractDomain(newUrl)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        
        editingIndex = -1
        
        // Update filtered leads
        if (searchInput.value) {
            filterLeads()
        } else {
            filteredLeads = myLeads
        }
        
        render(filteredLeads)
        showFeedback("Lead updated! ✅")
    }
}

function cancelEdit() {
    editingIndex = -1
    render(filteredLeads)
}

function exportLeads() {
    if (myLeads.length === 0) {
        showFeedback("No leads to export! 📋")
        return
    }
    
    const exportData = myLeads.map(lead => ({
        URL: lead.url,
        Title: lead.title || '',
        Date: lead.date
    }))
    
    const csvContent = "data:text/csv;charset=utf-8," + 
        "URL,Title,Date\n" +
        exportData.map(row => `"${row.URL}","${row.Title}","${row.Date}"`).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `leads_export_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    showFeedback("Leads exported successfully! 📤")
}

// CSS animation
const style = document.createElement('style')
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`
document.head.appendChild(style)
