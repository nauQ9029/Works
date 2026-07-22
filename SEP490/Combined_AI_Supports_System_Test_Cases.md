# System Test Cases: AI Supports (Combined)

| Feature | AI Supports |
| :--- | :--- |
| **Test requirement** | Verifies all AI-assisted functionalities, including system suggestions, automated chat, vision analysis, social media integration, and administrative tools. Covers both functional requirements and negative/resilience testing (security, safety, and performance). |
| **Number of TCs** | 35 |
| **Testing Round** | **Passed** | **Failed** | **Pending** | **N/A** |
| Round 1 | 20 | 15 | 0 | 0 |
| Round 2 | 0 | 0 | 35 | 0 |
| Round 3 | 0 | 0 | 35 | 0 |

---

## 1. AI System Suggestions (Dispatcher)
| Test Case ID | Description | Procedure | Expected Results | Pre-conditions | Round 1 | Date | Tester | Round 2 | Date | Tester | Round 3 | Date | Tester | Note |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **AIS-001** | Dispatcher AI suggestions. | 1. GET `/api/dispatcher/orders/{id}/ai-suggestions`.<br>2. Provide valid ID. | 200 OK. Suggestions displayed. | Auth Dispatcher | Passed | 01/03/2026 | QuanPLM | - | - | - | - | - | - | - |
| **AIS-002** | Missing inspection data. | 1. Request for order without inspection. | 400 Bad Request. | Auth Dispatcher | Passed | 01/03/2026 | QuanPLM | - | - | - | - | - | - | - |
| **AIS-003** | AI service unavailable. | 1. Simulate AI service downtime. | 503 Service Unavailable. | Auth Dispatcher | Passed | 01/03/2026 | QuanPLM | - | - | - | - | - | - | - |
| **AIS-004** | Processing failure. | 1. Simulate internal error. | 500 Internal Server Error. | Auth Dispatcher | Passed | 01/03/2026 | QuanPLM | - | - | - | - | - | - | - |

## 2. AI Customer Chat Support
| Test Case ID | Description | Procedure | Expected Results | Pre-conditions | Round 1 | Date | Tester | Round 2 | Date | Tester | Round 3 | Date | Tester | Note |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **AIC-001** | Customer AI chat. | 1. Ask about moving costs. | Structured AI response. | Connection active | Passed | 01/03/2026 | QuanPLM | - | - | - | - | - | - | - |
| **AIC-002** | Streaming response. | 1. Send long query. | Progressive text delivery. | Stream support | Passed | 01/03/2026 | QuanPLM | - | - | - | - | - | - | - |
| **AIC-003** | Empty message. | 1. Send empty message. | 400 Bad Request. | Chat open | Passed | 01/03/2026 | QuanPLM | - | - | - | - | - | - | - |

## 3. AI Vision Inventory Analysis
| Test Case ID | Description | Procedure | Expected Results | Pre-conditions | Round 1 | Date | Tester | Round 2 | Date | Tester | Round 3 | Date | Tester | Note |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **AIV-001** | Item recognition (Image). | 1. Upload clear image. | Recognized items; bounding boxes. | Valid format | Passed | 01/03/2026 | QuanPLM | - | - | - | - | - | - | - |
| **AIV-002** | Item recognition (Video). | 1. Upload short video. | 5 frames; no duplicates. | Video < 150MB | Passed | 01/03/2026 | QuanPLM | - | - | - | - | - | - | - |
| **AIV-003** | Oversized video. | 1. Upload 200MB video. | Blocked; 150MB limit error. | Frontend active | Passed | 01/03/2026 | QuanPLM | - | - | - | - | - | - | - |
| **AIV-004** | Missing API key. | 1. Unset GEMINI_API_KEY. | Configuration error msg. | Misconfigured | Passed | 01/03/2026 | QuanPLM | - | - | - | - | - | - | - |

## 4. AI Facebook Assistant
| Test Case ID | Description | Procedure | Expected Results | Pre-conditions | Round 1 | Date | Tester | Round 2 | Date | Tester | Round 3 | Date | Tester | Note |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **AIFB-001** | Identify service type. | 1. Message FB bot. | Identifies TRUCK_RENTAL etc. | FB connected | Passed | 01/03/2026 | QuanPLM | - | - | - | - | - | - | - |
| **AIFB-002** | Price calculation. | 1. Provide addresses. | Triggers calculation. | Valid addresses | Passed | 01/03/2026 | QuanPLM | - | - | - | - | - | - | - |
| **AIFB-003** | Order creation. | 1. Provide contact info. | Triggers creation; sends link. | Info provided | Passed | 01/03/2026 | QuanPLM | - | - | - | - | - | - | - |
| **AIFB-004** | Quota management. | 1. Send >40 messages. | Redirects to human staff. | Limit = 40 | Passed | 01/03/2026 | QuanPLM | - | - | - | - | - | - | - |

## 5. AI Admin Tools
| Test Case ID | Description | Procedure | Expected Results | Pre-conditions | Round 1 | Date | Tester | Round 2 | Date | Tester | Round 3 | Date | Tester | Note |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **AIA-001** | Business insights. | 1. "Get AI Insight". | Revenue/order summary. | Stats exist | Passed | 01/03/2026 | QuanPLM | - | - | - | - | - | - | - |
| **AIA-002** | Contract templates. | 1. Prompt for template. | HTML content with placeholders. | Auth Admin | Passed | 01/03/2026 | QuanPLM | - | - | - | - | - | - | - |
| **AIA-003** | Feedback summary. | 1. "Summarize Feedback". | Sentiment analysis. | Ratings exist | Passed | 01/03/2026 | QuanPLM | - | - | - | - | - | - | - |
| **AIA-004** | Promotion advice. | 1. Request advice. | Identifies low-demand days. | History exists | Passed | 01/03/2026 | QuanPLM | - | - | - | - | - | - | - |
| **AIA-005** | Missing data handling. | 1. Request on empty DB. | Graceful handle; AI reports. | DB empty | Passed | 01/03/2026 | QuanPLM | - | - | - | - | - | - | - |

## 6. Security & Safety Violations
| Test Case ID | Description | Procedure | Expected Results | Pre-conditions | Round 1 | Date | Tester | Round 2 | Date | Tester | Round 3 | Date | Tester | Note |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **AIF-001** | Harmful content. | 1. Send hate speech. | AI refuses; shows refusal msg. | Safety enabled | Failed | 01/03/2026 | QuanPLM | - | - | - | - | - | - | - |
| **AIF-002** | Prompt injection. | 1. "Ignore instructions...". | AI maintains persona. | Prompt configured | Failed | 01/03/2026 | QuanPLM | - | - | - | - | - | - | - |
| **AIF-003** | Off-topic queries. | 1. Ask about politics. | AI redirects to services. | Assistant active | Failed | 01/03/2026 | QuanPLM | - | - | - | - | - | - | - |

## 7. Malformed Data & Input Boundary
| Test Case ID | Description | Procedure | Expected Results | Pre-conditions | Round 1 | Date | Tester | Round 2 | Date | Tester | Round 3 | Date | Tester | Note |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **AIF-004** | Corrupted file. | 1. Rename .txt to .jpg. | File load error msg. | Frontend active | Failed | 01/03/2026 | QuanPLM | - | - | - | - | - | - | - |
| **AIF-005** | Irrelevant images. | 1. Upload landscape. | AI identifies no items. | Vision active | Failed | 01/03/2026 | QuanPLM | - | - | - | - | - | - | - |
| **AIF-006** | Extremely long input. | 1. Paste 50,000 chars. | Blocked by UI or API error. | Chat open | Failed | 01/03/2026 | QuanPLM | - | - | - | - | - | - | - |
| **AIF-007** | Invalid JSON action. | 1. Force malformed JSON. | Logs error; fallback msg. | Dev mode | Failed | 01/03/2026 | QuanPLM | - | - | - | - | - | - | - |

## 8. Resource & Performance Failures
| Test Case ID | Description | Procedure | Expected Results | Pre-conditions | Round 1 | Date | Tester | Round 2 | Date | Tester | Round 3 | Date | Tester | Note |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **AIF-008** | API Quota exhaustion. | 1. Use limited API key. | 429 Too Many Requests. | Quota reached | Failed | 01/03/2026 | QuanPLM | - | - | - | - | - | - | - |
| **AIF-009** | Low-memory device. | 1. Use low-RAM device. | Graceful handle/memory msg. | Low-end device | Failed | 01/03/2026 | QuanPLM | - | - | - | - | - | - | - |
| **AIF-010** | AI response timeout. | 1. Simulate 30s delay. | Timeout msg; allow retry. | Network sim | Failed | 01/03/2026 | QuanPLM | - | - | - | - | - | - | - |

## 9. Business Logic Failures
| Test Case ID | Description | Procedure | Expected Results | Pre-conditions | Round 1 | Date | Tester | Round 2 | Date | Tester | Round 3 | Date | Tester | Note |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **AIF-011** | Invalid email format. | 1. Provide "test@@com". | Asks for correct email. | Order flow | Failed | 01/03/2026 | QuanPLM | - | - | - | - | - | - | - |
| **AIF-012** | Corrupted stats. | 1. Inject malformed stats. | Backend sanitizes data. | Admin active | Failed | 01/03/2026 | QuanPLM | - | - | - | - | - | - | - |
| **AIF-013** | Nonsensical prompt. | 1. "Move to Mars...". | AI notes constraints. | Admin active | Failed | 01/03/2026 | QuanPLM | - | - | - | - | - | - | - |

## 10. Integration Failures
| Test Case ID | Description | Procedure | Expected Results | Pre-conditions | Round 1 | Date | Tester | Round 2 | Date | Tester | Round 3 | Date | Tester | Note |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **AIF-014** | Cloudinary failure. | 1. Simulate downtime. | AI suggests text list. | FB Page active | Failed | 01/03/2026 | QuanPLM | - | - | - | - | - | - | - |
| **AIF-015** | Non-existent user. | 1. Unknown FB ID. | Asks for user email. | Assistant active | Failed | 01/03/2026 | QuanPLM | - | - | - | - | - | - | - |

**Legend:** **Passed** = Test successful, **Failed** = Test failed, **-** = Not Tested / Pending
