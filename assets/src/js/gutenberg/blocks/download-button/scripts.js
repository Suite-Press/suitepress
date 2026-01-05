/**
 * Download Button Frontend Script - Simple click to download
 * File: assets/src/js/gutenberg/blocks/download-button/scripts.js
 */

document.addEventListener('DOMContentLoaded', function() {
    const downloadButtons = document.querySelectorAll('.suitepress-download-button');

    downloadButtons.forEach(container => {
        const triggerBtn = container.querySelector('.suitepress-download-trigger');
        
        if (!triggerBtn) {
            console.error('Download trigger button not found');
            return;
        }

        const downloadType = container.getAttribute('data-download-type') || 'zip';

        // Helper function to ensure HTTPS URLs (fix mixed content issues)
        function ensureHttpsUrl(url) {
            if (!url) return url;
            
            // If page is HTTPS, convert HTTP URLs to HTTPS
            if (window.location.protocol === 'https:' && url.startsWith('http://')) {
                return url.replace('http://', 'https://');
            }
            
            // If URL is protocol-relative (starts with //), use current protocol
            if (url.startsWith('//')) {
                return window.location.protocol + url;
            }
            
            return url;
        }

        // Parse file data from the block
        let files = [];
        try {
            const filesData = triggerBtn.getAttribute('data-files') || '[]';
            files = JSON.parse(filesData);
            
            // Validate files array
            if (!Array.isArray(files)) {
                console.error('Files data is not an array:', files);
                files = [];
            }
            
            // Filter out files without URLs and normalize URLs to HTTPS
            files = files.map(file => {
                if (file && file.url) {
                    return {
                        ...file,
                        url: ensureHttpsUrl(file.url)
                    };
                }
                return file;
            }).filter(file => file && file.url);
            
            if (files.length === 0) {
                console.warn('No valid files found in block data');
                triggerBtn.disabled = true;
                triggerBtn.textContent = 'No files available';
                return;
            }
        } catch (error) {
            console.error('Error parsing files data:', error);
            files = [];
            triggerBtn.disabled = true;
            return;
        }

        // Download single file directly
        async function downloadSingleFile(file) {
            if (!file.url) {
                throw new Error('File URL is missing');
            }

            // Ensure HTTPS URL
            const fileUrl = ensureHttpsUrl(file.url);
            const fileName = file.name || fileUrl.split('/').pop().split('?')[0] || `file-${file.id}`;

            try {
                // Fetch the file
                const response = await fetch(fileUrl, {
                    method: 'GET',
                    credentials: 'same-origin',
                    mode: 'cors'
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const blob = await response.blob();
                const blobUrl = URL.createObjectURL(blob);

                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = fileName;
                link.style.display = 'none';
                document.body.appendChild(link);
                
                // Trigger download
                link.click();
                
                // Clean up after a short delay
                setTimeout(() => {
                    document.body.removeChild(link);
                    URL.revokeObjectURL(blobUrl);
                }, 100);
            } catch (error) {
                console.error(`Failed to download ${fileName}:`, error);
                // Fallback: try direct link download (using HTTPS URL)
                const link = document.createElement('a');
                link.href = fileUrl;
                link.download = fileName;
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                setTimeout(() => {
                    document.body.removeChild(link);
                }, 100);
            }
        }

        // Download as ZIP
        async function downloadAsZip() {
            // Load JSZip if not available
            if (typeof JSZip === 'undefined') {
                await loadJSZip();
            }

            const zip = new JSZip();

            // Add files to zip
            for (const file of files) {
                if (file.url) {
                    try {
                        // Ensure HTTPS URL
                        const fileUrl = ensureHttpsUrl(file.url);
                        const response = await fetch(fileUrl, {
                            method: 'GET',
                            credentials: 'same-origin',
                            mode: 'cors'
                        });
                        
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        
                        const blob = await response.blob();
                        const fileName = file.name || fileUrl.split('/').pop().split('?')[0] || `file-${file.id}`;
                        zip.file(fileName, blob);
                    } catch (error) {
                        console.error(`Failed to fetch file ${file.name || file.url}:`, error);
                    }
                }
            }

            // Check if zip has any files
            if (Object.keys(zip.files).length === 0) {
                throw new Error('No files could be added to the ZIP archive.');
            }

            // Generate and download zip
            const zipBlob = await zip.generateAsync({ type: 'blob' });
            const zipUrl = URL.createObjectURL(zipBlob);

            const link = document.createElement('a');
            link.href = zipUrl;
            link.download = `download-${Date.now()}.zip`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up
            URL.revokeObjectURL(zipUrl);
        }

        // Download individual files
        async function downloadIndividualFiles() {
            for (const file of files) {
                if (file.url) {
                    await downloadSingleFile(file);
                    // Small delay between downloads
                    await new Promise(resolve => setTimeout(resolve, 300));
                }
            }
        }

        // Load JSZip library
        function loadJSZip() {
            return new Promise((resolve, reject) => {
                if (typeof JSZip !== 'undefined') {
                    resolve();
                    return;
                }

                const script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
                script.onload = resolve;
                script.onerror = () => reject(new Error('Failed to load JSZip library'));
                document.head.appendChild(script);
            });
        }

        // Main download function
        async function downloadFiles() {
            if (files.length === 0) {
                console.error('No files available for download');
                return;
            }

            try {
                triggerBtn.classList.add('loading');
                triggerBtn.disabled = true;

                // If single file, download directly
                if (files.length === 1) {
                    await downloadSingleFile(files[0]);
                } else if (downloadType === 'zip') {
                    await downloadAsZip();
                } else {
                    await downloadIndividualFiles();
                }

            } catch (error) {
                console.error('Download error:', error);
                alert('Download failed. Please try again.');
            } finally {
                triggerBtn.classList.remove('loading');
                triggerBtn.disabled = false;
            }
        }

        // Simple click handler - just download
        triggerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            downloadFiles();
        });
    });
});
