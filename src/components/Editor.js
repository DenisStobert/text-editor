import React, { useState, useEffect } from 'react';

const Editor = () => {
    const [content, setContent] = useState('');
    const [deletedTexts, setDeletedTexts] = useState([]);
    const [pendingAnimations, setPendingAnimations] = useState([]);
    const [showDeletedTexts, setShowDeletedTexts] = useState(false);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileContent = e.target.result;
            setContent(fileContent); 
            setTimeout(() => { 
                const editor = document.querySelector('.editor-content');
                if (editor) editor.innerHTML = fileContent;
            }, 0);
        };
        reader.readAsText(file);
    };

    const handleBoldText = () => {
        document.execCommand('bold', false, null);
        setContent(document.querySelector('.editor-content').innerHTML); 
    };

    const handleDeleteText = () => {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const selectedText = selection.toString();
            if (selectedText) {
                const range = selection.getRangeAt(0);
                
                const strikeElement = document.createElement('span');
                strikeElement.style.textDecoration = 'line-through';
                strikeElement.style.color = 'red';
                strikeElement.style.transition = 'all 0.4s';
                strikeElement.className = 'strikethrough animated-text';

                const parentElement = range.startContainer.parentElement;
                if (parentElement) {
                    const parentStyles = window.getComputedStyle(parentElement);
                    strikeElement.style.fontSize = parentStyles.fontSize;
                    strikeElement.style.fontFamily = parentStyles.fontFamily;
                    strikeElement.style.fontWeight = parentStyles.fontWeight;
                }

                strikeElement.textContent = selectedText;
                range.deleteContents();
                range.insertNode(strikeElement);

                setPendingAnimations(prev => [...prev, strikeElement]);
                setContent(document.querySelector('.editor-content').innerHTML);
            }
        }
    };

    const handleContentClick = () => {
        const module = document.querySelector('.deleted-texts-module');

        pendingAnimations.forEach(node => {
            const rect = node.getBoundingClientRect();
            const moduleRect = module.getBoundingClientRect();

            node.style.position = 'absolute';
            node.style.zIndex = '1000';
            node.style.left = `${rect.left}px`;
            node.style.top = `${rect.top}px`;

            document.body.appendChild(node);

            requestAnimationFrame(() => {
                node.style.transition = 'transform 0.6s, opacity 0.6s';
                node.style.transform = `translate(${moduleRect.left - rect.left}px, ${moduleRect.top - rect.top}px) scale(0.1)`;
                node.style.opacity = '0';
            });

            setTimeout(() => {
                setDeletedTexts(prev => [node.textContent, ...prev]);
                node.remove();
                setContent(document.querySelector('.editor-content').innerHTML);
            }, 600); 
        });

        setPendingAnimations([]);
    };

    return (
        <div style={{ padding: '20px' }}>
            <div className="editor-container">
                <h2>Текстовый редактор</h2>
                <div>
                    <label htmlFor="fileUpload" className="upload-button">Загрузить HTML файл</label>
                    <input 
                        type="file" 
                        id="fileUpload" 
                        accept=".html" 
                        onChange={handleFileUpload} 
                        style={{ display: 'none' }}
                    />
                </div>
                <button onClick={handleBoldText}>Сделать полужирным</button>
                <button onClick={handleDeleteText}>Удалить выделенное</button>

                <div
                    className="deleted-texts-module"
                    onMouseEnter={() => setShowDeletedTexts(true)}
                    onMouseLeave={() => setShowDeletedTexts(false)}
                >
                    {showDeletedTexts ? (
                        <ul>
                            {deletedTexts.map((text, index) => (
                                <li key={index} className="deleted-item">{text}</li>
                            ))}
                        </ul>
                    ) : null}
                </div>

                <div
                    contentEditable
                    onClick={handleContentClick}
                    className="editor-content"
                >
                </div>
            </div>
        </div>
    );
};

export default Editor;
