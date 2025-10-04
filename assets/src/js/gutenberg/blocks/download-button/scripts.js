/**
 * Download Button Frontend Script - Updated with actual download functionality
 * File: assets/src/js/download-button-scripts.js
 */

document.addEventListener('DOMContentLoaded', function() {
    const downloadButtons = document.querySelectorAll('.suitepress-download-button');

    downloadButtons.forEach(container => {
        const triggerBtn = container.querySelector('.suitepress-download-trigger');
        const leadForm = container.querySelector('.lead-capture-form');
        const messagesContainer = container.querySelector('.download-messages');
        const successMessage = container.querySelector('.success-message');
        const errorMessage = container.querySelector('.error-message');

        const enableLeadCapture = container.getAttribute('data-enable-lead-capture') === 'true';
        const requireLeadCapture = container.getAttribute('data-require-lead-capture') === 'true';
        const webhookUrl = container.getAttribute('data-webhook-url');
        const webhookMethod = container.getAttribute('data-webhook-method') || 'POST';
        const webhookHeaders = JSON.parse(container.getAttribute('data-webhook-headers') || '{}');
        const fieldMappings = JSON.parse(container.getAttribute('data-field-mappings') || '{}');
        const successMsg = container.getAttribute('data-success-message');
        const errorMsg = container.getAttribute('data-error-message');
        const requirePrivacy = container.getAttribute('data-require-privacy') === 'true';
        const downloadType = container.getAttribute('data-download-type') || 'zip';

        // File data from the block
        const files = JSON.parse(triggerBtn.getAttribute('data-files') || '[]');

        // Show message function
        function showMessage(type, message) {
            messagesContainer.style.display = 'block';
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';

            if (type === 'success') {
                successMessage.textContent = message;
                successMessage.style.display = 'block';
            } else {
                errorMessage.textContent = message;
                errorMessage.style.display = 'block';
            }

            setTimeout(() => {
                messagesContainer.style.display = 'none';
            }, 5000);
        }

        // Actual download functionality
        async function downloadFiles() {
            if (files.length === 0) {
                showMessage('error', 'No files available for download.');
                return;
            }

            try {
                triggerBtn.classList.add('loading');
                triggerBtn.disabled = true;

                if (downloadType === 'zip' && files.length > 1) {
                    await downloadAsZip();
                } else {
                    await downloadIndividualFiles();
                }

                showMessage('success', successMsg || 'Download completed!');

            } catch (error) {
                console.error('Download error:', error);
                showMessage('error', errorMsg || 'Download failed. Please try again.');
            } finally {
                triggerBtn.classList.remove('loading');
                triggerBtn.disabled = false;
            }
        }

        // Download as ZIP
        async function downloadAsZip() {
            // Check if JSZip is available
            if (typeof JSZip === 'undefined') {
                // Load JSZip dynamically
                await loadJSZip();
            }

            const zip = new JSZip();

            // Add files to zip
            for (const file of files) {
                if (file.url) {
                    try {
                        const response = await fetch(file.url);
                        const blob = await response.blob();
                        zip.file(file.name, blob);
                    } catch (error) {
                        console.error(`Failed to fetch file ${file.name}:`, error);
                    }
                }
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
                    try {
                        const link = document.createElement('a');
                        link.href = file.url;
                        link.download = file.name;
                        link.style.display = 'none';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);

                        // Small delay between downloads
                        await new Promise(resolve => setTimeout(resolve, 100));
                    } catch (error) {
                        console.error(`Failed to download ${file.name}:`, error);
                    }
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
                script.onerror = reject;
                document.head.appendChild(script);
            });
        }

        // Send webhook data with field mapping
        async function sendWebhookData(formData) {
            if (!webhookUrl) return true;

            try {
                // Map form data using field mappings
                const mappedData = {};
                Object.keys(fieldMappings).forEach(formField => {
                    const endpointField = fieldMappings[formField];
                    if (formData[formField]) {
                        mappedData[endpointField] = formData[formField];
                    }
                });

                const payload = {
                    timestamp: new Date().toISOString(),
                    source: 'suitepress_download_button',
                    lead: mappedData,
                    files: files.map(f => f.name),
                    download_type: downloadType
                };

                const response = await fetch(webhookUrl, {
                    method: webhookMethod,
                    headers: {
                        'Content-Type': 'application/json',
                        ...webhookHeaders
                    },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                return true;
            } catch (error) {
                console.error('Webhook error:', error);
                return false;
            }
        }

        // Validate form
        function validateForm(form) {
            const email = form.querySelector('#download-email').value;
            const privacyCheckbox = form.querySelector('.privacy-checkbox');

            if (!email || !isValidEmail(email)) {
                showMessage('error', 'Please enter a valid email address.');
                return false;
            }

            if (requirePrivacy && (!privacyCheckbox || !privacyCheckbox.checked)) {
                showMessage('error', 'Please agree to the privacy policy.');
                return false;
            }

            return true;
        }

        // Email validation
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        // Get form data
        function getFormData() {
            return {
                name: container.querySelector('#download-name').value,
                email: container.querySelector('#download-email').value,
                phone: container.querySelector('#download-phone').value
            };
        }

        // Show/hide form functions (same as before)
        function showLeadCaptureForm() {
            leadForm.style.display = 'block';
            triggerBtn.style.display = 'none';
        }

        function hideLeadCaptureForm() {
            leadForm.style.display = 'none';
            triggerBtn.style.display = 'block';
            leadForm.reset();
        }

        // Event listeners (same as before)
        triggerBtn.addEventListener('click', function() {
            if (enableLeadCapture && (requireLeadCapture || confirm('Would you like to share your contact information before downloading?'))) {
                showLeadCaptureForm();
            } else {
                downloadFiles();
            }
        });

        const submitBtn = container.querySelector('.btn-submit');
        if (submitBtn) {
            submitBtn.addEventListener('click', async function() {
                if (!validateForm(leadForm)) return;

                const formData = getFormData();
                const webhookSuccess = await sendWebhookData(formData);

                if (webhookSuccess) {
                    showMessage('success', successMsg || 'Thank you! Your download will begin shortly.');
                    await downloadFiles();
                } else {
                    showMessage('error', errorMsg || 'Failed to submit information. Please try again.');
                }

                hideLeadCaptureForm();
            });
        }

        const cancelBtn = container.querySelector('.btn-cancel');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', hideLeadCaptureForm);
        }

        const skipBtn = container.querySelector('.btn-skip');
        if (skipBtn) {
            skipBtn.addEventListener('click', function() {
                downloadFiles();
                hideLeadCaptureForm();
            });
        }

        // Enter key support
        const formInputs = container.querySelectorAll('.form-input');
        formInputs.forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    submitBtn.click();
                }
            });
        });
    });
});
