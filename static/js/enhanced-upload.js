// Enhanced Upload Form JavaScript
class GameUploadManager {
    constructor() {
        this.selectedTags = new Set();
        this.tagSuggestions = [
            'multiplayer', 'singleplayer', 'open-world', 'fantasy', 'sci-fi', 'horror',
            'action', 'adventure', 'rpg', 'strategy', 'indie', 'retro', 'pixel-art',
            'story-rich', 'atmospheric', 'competitive', 'cooperative', 'sandbox',
            'survival', 'building', 'crafting', 'exploration', 'puzzle', 'platformer',
            'racing', 'sports', 'simulation', 'management', 'turn-based', 'real-time',
            'stealth', 'roguelike', 'metroidvania', 'battle-royale', 'mmorpg',
            'early-access', 'beta', 'free-to-play', 'vr-support', 'controller-support',
            'mod-support', 'achievements', 'leaderboards', 'cross-platform'
        ];
        this.screenshots = [];
        this.init();
    }

    init() {
        this.setupLogoUpload();
        this.setupScreenshotUpload();
        this.setupTagSystem();
        this.setupFormValidation();
        this.setupAnimations();
    }

    setupLogoUpload() {
        const logoDropZone = document.getElementById('logoDropZone');
        const logoFile = document.getElementById('logoFile');
        const logoDropContent = document.getElementById('logoDropContent');
        const logoPreview = document.getElementById('logoPreview');
        const logoImg = document.getElementById('logoImg');

        // Click to upload
        logoDropZone.addEventListener('click', () => logoFile.click());

        // Drag and drop events
        logoDropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            logoDropZone.classList.add('drag-over');
        });

        logoDropZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            logoDropZone.classList.remove('drag-over');
        });

        logoDropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            logoDropZone.classList.remove('drag-over');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleLogoFile(files[0]);
            }
        });

        // File input change
        logoFile.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.handleLogoFile(e.target.files[0]);
            }
        });
    }

    handleLogoFile(file) {
        if (!file.type.startsWith('image/')) {
            this.showNotification('Please select an image file', 'error');
            return;
        }

        if (file.size > 16 * 1024 * 1024) {
            this.showNotification('File size must be less than 16MB', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const logoImg = document.getElementById('logoImg');
            const logoDropContent = document.getElementById('logoDropContent');
            const logoPreview = document.getElementById('logoPreview');

            logoImg.src = e.target.result;
            logoDropContent.style.display = 'none';
            logoPreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    setupScreenshotUpload() {
        const screenshotDropZone = document.getElementById('screenshotDropZone');
        const screenshotsInput = document.getElementById('screenshots');

        screenshotDropZone.addEventListener('click', () => screenshotsInput.click());

        screenshotDropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            screenshotDropZone.classList.add('drag-over');
        });

        screenshotDropZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            screenshotDropZone.classList.remove('drag-over');
        });

        screenshotDropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            screenshotDropZone.classList.remove('drag-over');
            const files = Array.from(e.dataTransfer.files);
            this.handleScreenshots(files);
        });

        screenshotsInput.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            this.handleScreenshots(files);
        });
    }

    handleScreenshots(files) {
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        
        if (this.screenshots.length + imageFiles.length > 5) {
            this.showNotification('Maximum 5 screenshots allowed', 'error');
            return;
        }

        imageFiles.forEach(file => {
            if (file.size > 16 * 1024 * 1024) {
                this.showNotification(`${file.name} is too large (max 16MB)`, 'error');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                this.screenshots.push({
                    file: file,
                    dataUrl: e.target.result,
                    name: file.name
                });
                this.updateScreenshotPreviews();
            };
            reader.readAsDataURL(file);
        });
    }

    updateScreenshotPreviews() {
        const container = document.getElementById('screenshotPreviews');
        container.innerHTML = '';

        this.screenshots.forEach((screenshot, index) => {
            const col = document.createElement('div');
            col.className = 'col-md-4 col-6 mb-2';
            
            col.innerHTML = `
                <div class="position-relative">
                    <img src="${screenshot.dataUrl}" class="screenshot-preview w-100" alt="Screenshot ${index + 1}">
                    <button type="button" class="btn btn-sm btn-danger position-absolute top-0 end-0 m-1" 
                            onclick="gameUpload.removeScreenshot(${index})">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            
            container.appendChild(col);
        });
    }

    removeScreenshot(index) {
        this.screenshots.splice(index, 1);
        this.updateScreenshotPreviews();
    }

    setupTagSystem() {
        const tagInput = document.getElementById('tagInput');
        const tagSuggestions = document.getElementById('tagSuggestions');
        const selectedTags = document.getElementById('selectedTags');
        const tagsHidden = document.getElementById('tags');

        tagInput.addEventListener('input', (e) => {
            const value = e.target.value.toLowerCase();
            this.showTagSuggestions(value);
        });

        tagInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ',') {
                e.preventDefault();
                const tag = tagInput.value.trim();
                if (tag) {
                    this.addTag(tag);
                    tagInput.value = '';
                    this.hideTagSuggestions();
                }
            }
        });

        document.addEventListener('click', (e) => {
            if (!tagInput.contains(e.target) && !tagSuggestions.contains(e.target)) {
                this.hideTagSuggestions();
            }
        });
    }

    showTagSuggestions(query) {
        const tagSuggestions = document.getElementById('tagSuggestions');
        const filtered = this.tagSuggestions.filter(tag => 
            tag.includes(query) && !this.selectedTags.has(tag)
        ).slice(0, 8);

        if (filtered.length > 0 && query.length > 0) {
            tagSuggestions.innerHTML = filtered.map(tag => 
                `<div class="tag-suggestion" onclick="gameUpload.addTag('${tag}')">${tag}</div>`
            ).join('');
            tagSuggestions.style.display = 'block';
        } else {
            this.hideTagSuggestions();
        }
    }

    hideTagSuggestions() {
        document.getElementById('tagSuggestions').style.display = 'none';
    }

    addTag(tag) {
        const cleanTag = tag.toLowerCase().trim();
        if (cleanTag && !this.selectedTags.has(cleanTag)) {
            this.selectedTags.add(cleanTag);
            this.updateTagDisplay();
            this.updateTagsInput();
            document.getElementById('tagInput').value = '';
        }
    }

    removeTag(tag) {
        this.selectedTags.delete(tag);
        this.updateTagDisplay();
        this.updateTagsInput();
    }

    updateTagDisplay() {
        const container = document.getElementById('selectedTags');
        container.innerHTML = Array.from(this.selectedTags).map(tag => 
            `<div class="tag-chip">
                ${tag}
                <span class="remove-tag" onclick="gameUpload.removeTag('${tag}')">×</span>
            </div>`
        ).join('');
    }

    updateTagsInput() {
        document.getElementById('tags').value = Array.from(this.selectedTags).join(',');
    }

    setupFormValidation() {
        const form = document.getElementById('uploadForm');
        const submitBtn = document.getElementById('submitBtn');

        form.addEventListener('submit', (e) => {
            if (!this.validateForm()) {
                e.preventDefault();
                return false;
            }

            submitBtn.innerHTML = '<span class="loading me-2"></span>Uploading...';
            submitBtn.disabled = true;
        });
    }

    validateForm() {
        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim();
        const downloadLink = document.getElementById('download_link').value.trim();
        const genre = document.getElementById('genre').value;

        if (!title) {
            this.showNotification('Game title is required', 'error');
            document.getElementById('title').focus();
            return false;
        }

        if (!description) {
            this.showNotification('Game description is required', 'error');
            document.getElementById('description').focus();
            return false;
        }

        if (!downloadLink) {
            this.showNotification('Download link is required', 'error');
            document.getElementById('download_link').focus();
            return false;
        }

        if (!genre) {
            this.showNotification('Please select a genre', 'error');
            document.getElementById('genre').focus();
            return false;
        }

        return true;
    }

    setupAnimations() {
        // Add smooth animations to form elements
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; max-width: 300px;';
        
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
}

// Global functions for template onclick handlers
window.removeLogo = function() {
    const logoDropContent = document.getElementById('logoDropContent');
    const logoPreview = document.getElementById('logoPreview');
    const logoFile = document.getElementById('logoFile');
    
    logoDropContent.style.display = 'block';
    logoPreview.style.display = 'none';
    logoFile.value = '';
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.gameUpload = new GameUploadManager();
});