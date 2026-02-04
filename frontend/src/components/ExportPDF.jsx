import { useState } from "react";

export default function ExportPDF({ steps, patientContext, riskLevel, explanation }) {
    const [isExporting, setIsExporting] = useState(false);

    const handleExportPDF = async () => {
        if (!steps || steps.length === 0) {
            alert("No pathway to export. Please generate a pathway first.");
            return;
        }

        setIsExporting(true);

        try {
            // Dynamically import html2pdf
            const html2pdf = (await import('html2pdf.js')).default;

            // Create PDF content
            const content = createPDFContent();

            // Configure PDF options
            const options = {
                margin: 0.5,
                filename: `clinical-pathway-${patientContext?.symptom || 'report'}-${new Date().toISOString().split('T')[0]}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };

            // Generate and download PDF
            await html2pdf().set(options).from(content).save();

        } catch (error) {
            console.error('PDF export error:', error);
            alert('Failed to export PDF. Please try again.');
        } finally {
            setIsExporting(false);
        }
    };

    const createPDFContent = () => {
        const container = document.createElement('div');
        container.style.padding = '40px';
        container.style.fontFamily = 'Arial, sans-serif';
        container.style.color = '#1f2937';
        container.style.lineHeight = '1.6';

        // Header
        const header = document.createElement('div');
        header.style.borderBottom = '3px solid #3b82f6';
        header.style.paddingBottom = '20px';
        header.style.marginBottom = '30px';
        header.innerHTML = `
            <h1 style="margin: 0; color: #1f2937; font-size: 28px;">
                Clinical Pathway Report
            </h1>
            <p style="margin: 10px 0 0 0; color: #6b7280; font-size: 14px;">
                Generated: ${new Date().toLocaleString()}
            </p>
        `;
        container.appendChild(header);

        // Patient Information
        if (patientContext) {
            const patientInfo = document.createElement('div');
            patientInfo.style.backgroundColor = '#f3f4f6';
            patientInfo.style.padding = '20px';
            patientInfo.style.borderRadius = '8px';
            patientInfo.style.marginBottom = '25px';
            patientInfo.innerHTML = `
                <h2 style="margin: 0 0 15px 0; color: #1f2937; font-size: 20px; border-bottom: 2px solid #3b82f6; padding-bottom: 8px;">
                    Patient Information
                </h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold; width: 40%;">Symptom:</td>
                        <td style="padding: 8px 0;">${patientContext.symptom?.replace(/_/g, ' ').toUpperCase() || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold;">Age:</td>
                        <td style="padding: 8px 0;">${patientContext.age} years</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold;">Severity:</td>
                        <td style="padding: 8px 0;">${patientContext.severity?.toUpperCase()}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold;">Duration:</td>
                        <td style="padding: 8px 0;">${patientContext.duration} hours</td>
                    </tr>
                </table>
            `;
            container.appendChild(patientInfo);
        }

        // Risk Assessment
        if (riskLevel) {
            const riskColor = riskLevel.toLowerCase().includes('high') ? '#ef4444' :
                riskLevel.toLowerCase().includes('low') ? '#22c55e' : '#f59e0b';

            const riskSection = document.createElement('div');
            riskSection.style.backgroundColor = riskColor + '20';
            riskSection.style.border = `2px solid ${riskColor}`;
            riskSection.style.padding = '15px';
            riskSection.style.borderRadius = '8px';
            riskSection.style.marginBottom = '25px';
            riskSection.innerHTML = `
                <h3 style="margin: 0; color: ${riskColor}; font-size: 18px;">
                    ⚠️ Risk Level: ${riskLevel.replace(/_/g, ' ').toUpperCase()}
                </h3>
            `;
            container.appendChild(riskSection);
        }

        // Clinical Pathway Steps
        const pathwaySection = document.createElement('div');
        pathwaySection.style.marginBottom = '25px';
        pathwaySection.innerHTML = `
            <h2 style="margin: 0 0 15px 0; color: #1f2937; font-size: 20px; border-bottom: 2px solid #3b82f6; padding-bottom: 8px;">
                Clinical Pathway
            </h2>
        `;

        const stepsList = document.createElement('ol');
        stepsList.style.margin = '0';
        stepsList.style.padding = '0 0 0 25px';

        steps.forEach((step) => {
            const stepItem = document.createElement('li');
            stepItem.style.padding = '12px';
            stepItem.style.marginBottom = '10px';
            stepItem.style.backgroundColor = '#f9fafb';
            stepItem.style.borderLeft = '4px solid #3b82f6';
            stepItem.style.borderRadius = '4px';
            stepItem.textContent = step;
            stepsList.appendChild(stepItem);
        });

        pathwaySection.appendChild(stepsList);
        container.appendChild(pathwaySection);

        // Explanation
        if (explanation) {
            const explanationSection = document.createElement('div');
            explanationSection.style.backgroundColor = '#eff6ff';
            explanationSection.style.padding = '20px';
            explanationSection.style.borderRadius = '8px';
            explanationSection.style.borderLeft = '4px solid #3b82f6';
            explanationSection.innerHTML = `
                <h2 style="margin: 0 0 15px 0; color: #1f2937; font-size: 20px;">
                    Clinical Rationale
                </h2>
                <p style="margin: 0; white-space: pre-wrap; color: #374151;">
                    ${explanation}
                </p>
            `;
            container.appendChild(explanationSection);
        }

        // Footer
        const footer = document.createElement('div');
        footer.style.marginTop = '40px';
        footer.style.paddingTop = '20px';
        footer.style.borderTop = '2px solid #e5e7eb';
        footer.style.fontSize = '12px';
        footer.style.color = '#9ca3af';
        footer.innerHTML = `
            <p style="margin: 0;">
                This pathway was generated by the Clinical Pathway Generator system.
                All recommendations should be reviewed by qualified medical personnel.
            </p>
        `;
        container.appendChild(footer);

        return container;
    };

    return (
        <button
            onClick={handleExportPDF}
            disabled={isExporting || !steps || steps.length === 0}
            style={{
                background: isExporting ? 'rgba(107, 114, 128, 0.2)' : 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
                border: 'none',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: isExporting || !steps?.length ? 'not-allowed' : 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s',
                opacity: isExporting || !steps?.length ? 0.5 : 1
            }}
            onMouseEnter={(e) => {
                if (!isExporting && steps?.length) {
                    e.currentTarget.style.transform = 'scale(1.05)';
                }
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
            }}
        >
            {isExporting ? (
                <>
                    <span style={{
                        display: 'inline-block',
                        width: '16px',
                        height: '16px',
                        border: '2px solid #fff',
                        borderTopColor: 'transparent',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite'
                    }}></span>
                    Generating PDF...
                </>
            ) : (
                <>
                    📄 Export PDF
                </>
            )}
        </button>
    );
}
