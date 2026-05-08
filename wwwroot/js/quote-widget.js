class QuoteWidget extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.loadQuote();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .quote-container {
                    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                    border-radius: 12px;
                    padding: 24px;
                    color: white;
                    min-height: 200px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    position: relative;
                }

                .quote-mark {
                    font-size: 60px;
                    position: absolute;
                    top: 10px;
                    left: 20px;
                    opacity: 0.3;
                    font-family: Georgia, serif;
                }

                .quote-content {
                    font-size: 18px;
                    line-height: 1.6;
                    margin-bottom: 16px;
                    font-style: italic;
                    position: relative;
                    z-index: 1;
                }

                .quote-author {
                    font-size: 16px;
                    font-weight: 600;
                    text-align: right;
                    opacity: 0.9;
                }

                .quote-author::before {
                    content: "— ";
                }

                .loading {
                    text-align: center;
                    padding: 40px 20px;
                    font-style: italic;
                }

                .error {
                    text-align: center;
                    padding: 20px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 8px;
                    margin-top: 16px;
                }

                .refresh-btn {
                    background: rgba(255, 255, 255, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    color: white;
                    padding: 8px 16px;
                    border-radius: 6px;
                    cursor: pointer;
                    margin-top: 12px;
                    font-size: 14px;
                }

                .refresh-btn:hover {
                    background: rgba(255, 255, 255, 0.3);
                }

                .quote-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 16px;
                }

                .quote-date {
                    font-size: 12px;
                    opacity: 0.7;
                }
            </style>

            <div class="quote-container">
                <div class="quote-mark">"</div>
                <div class="loading" id="loading">
                    <div>Loading inspiration...</div>
                </div>
                <div class="quote-content" id="quoteContent" style="display: none;">
                    <div class="quote-text" id="quoteText"></div>
                    <div class="quote-footer">
                        <div class="quote-date" id="quoteDate"></div>
                        <div class="quote-author" id="quoteAuthor"></div>
                    </div>
                    <button class="refresh-btn" id="refreshBtn">New Quote</button>
                </div>
                <div class="error" id="error" style="display: none;">
                    <div>Unable to load quote</div>
                    <button class="refresh-btn" id="retryBtn">Try Again</button>
                </div>
            </div>
        `;

        this.shadowRoot.getElementById('refreshBtn').addEventListener('click', () => this.loadQuote());
        this.shadowRoot.getElementById('retryBtn').addEventListener('click', () => this.loadQuote());
    }

    async loadQuote() {
        const loading = this.shadowRoot.getElementById('loading');
        const content = this.shadowRoot.getElementById('quoteContent');
        const error = this.shadowRoot.getElementById('error');

        loading.style.display = 'block';
        content.style.display = 'none';
        error.style.display = 'none';

        try {
            const quote = await this.getQuote();
            this.updateQuoteDisplay(quote);
            loading.style.display = 'none';
            content.style.display = 'block';
        } catch (err) {
            console.error('Quote fetch error:', err);
            loading.style.display = 'none';
            error.style.display = 'block';
        }
    }

    async getQuote() {
        const quotes = [
            {
                text: "The only way to do great work is to love what you do.",
                author: "Steve Jobs"
            },
            {
                text: "Innovation distinguishes between a leader and a follower.",
                author: "Steve Jobs"
            },
            {
                text: "Life is what happens when you're busy making other plans.",
                author: "John Lennon"
            },
            {
                text: "The future belongs to those who believe in the beauty of their dreams.",
                author: "Eleanor Roosevelt"
            },
            {
                text: "It is during our darkest moments that we must focus to see the light.",
                author: "Aristotle"
            },
            {
                text: "The best time to plant a tree was 20 years ago. The second best time is now.",
                author: "Chinese Proverb"
            },
            {
                text: "Your time is limited, don't waste it living someone else's life.",
                author: "Steve Jobs"
            },
            {
                text: "The only impossible journey is the one you never begin.",
                author: "Tony Robbins"
            }
        ];

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        return quotes[Math.floor(Math.random() * quotes.length)];
    }

    updateQuoteDisplay(quote) {
        this.shadowRoot.getElementById('quoteText').textContent = quote.text;
        this.shadowRoot.getElementById('quoteAuthor').textContent = quote.author;
        this.shadowRoot.getElementById('quoteDate').textContent = new Date().toLocaleDateString();
    }
}

customElements.define('quote-widget', QuoteWidget);
