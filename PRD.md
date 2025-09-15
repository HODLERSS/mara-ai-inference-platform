# MARA AI Inference Platform - Product Requirements Document
## Project Sapien

**Document Version**: 1.0
**Date**: September 14, 2025
**Author**: Minjae Lee, Senior Manager Corporate Strategy
**Status**: Draft for Mockup Development

---

## Executive Summary

MARA AI Inference Platform (Project Sapien) is an Inference-as-a-Service platform designed to deliver sovereign-ready, sub-120 µs/token inference to enterprise customers at 30-50% lower cost than hyperscalers. The platform leverages MARA's unique positioning in edge infrastructure and partnerships with next-generation compute providers (SambaNova, Etched) to offer differentiated performance and compliance capabilities.

### Vision Statement
To become the leading inference platform for enterprises requiring sovereign AI deployments with guaranteed performance, cost efficiency, and compliance controls.

### Value Proposition
- **Performance**: Sub-10ms Time-to-First-Token (TTFT) with 99%+ availability
- **Cost**: 30-50% lower than AWS/Azure/GCP inference offerings
- **Sovereignty**: Region-locked deployments with zero-logging options
- **Compatibility**: OpenAI-compatible APIs for seamless migration

---

## Business Objectives & Key Results

Based on MARA's December 2025 OKRs for Project Sapien:

### 1. Validate Technological Feasibility
**Hypothesis**: MARA containers can deliver inference workloads with SLA-grade performance on partner ASICs using air cooling and edge deployments.

**Key Results**:
- ≥ 99% availability and ≤ 5% idle time on deployed containers
- At least 3 of top 10 open-source LLMs with working endpoints
- Inference stack operational on 3 compute platforms (ASIC/GPU/Edge)

### 2. Validate Financial Viability
**Hypothesis**: Customers agree to pilot or pay; cost per token is profitable.

**Key Results**:
- Sign 2 design partners with usage-based or committed contracts
- Gross margin > 40% on $/token cost for any live deployment
- Over ≥ 25% penetration on target customer's inference workloads

### 3. Validate Product-Market Fit
**Hypothesis**: Customers trust MARA by adopting, utilizing, and requesting expansion.

**Key Results**:
- At least 3 models deployed across 2 organizations with active traffic
- Net Promoter Score (NPS) ≥ 30 from design partner users
- 2 customers request expansion or additional container regions

---

## User Personas & Use Cases

### Primary Personas

#### 1. ML/AI Engineer
- **Goals**: Fast, reliable inference with minimal latency
- **Pain Points**: High costs, vendor lock-in, unpredictable performance
- **Use Cases**: Model deployment, A/B testing, performance optimization

#### 2. DevOps/Platform Engineer
- **Goals**: Scalable infrastructure, monitoring, incident response
- **Pain Points**: Complex deployment pipelines, lack of observability
- **Use Cases**: Infrastructure management, autoscaling configuration, SLO monitoring

#### 3. Enterprise Developer
- **Goals**: Simple API integration, comprehensive documentation
- **Pain Points**: Complex onboarding, poor developer experience
- **Use Cases**: Application integration, prototyping, production deployment

#### 4. Compliance/Security Officer
- **Goals**: Data sovereignty, audit trails, security controls
- **Pain Points**: Lack of transparency, insufficient compliance features
- **Use Cases**: Region enforcement, audit log review, security policy implementation

#### 5. Finance/Procurement
- **Goals**: Cost optimization, predictable billing, budget control
- **Pain Points**: Surprise charges, lack of cost visibility
- **Use Cases**: Budget planning, usage monitoring, cost allocation

---

## Product Features & Requirements

### Epic 1: Onboarding & Console API Layer (AI-1)

#### User Registration & Organization Creation (AI-13)
**User Story**: As a new user, I can sign up and create an Organization to isolate billing and access.

**Requirements**:
- Auth0 integration for email/SSO (Google/O365)
- Organization name, default region selection
- Team member invitation capability
- End-to-end onboarding in < 60 seconds

**UI Components**:
- Registration form with social login options
- Organization setup wizard
- Team invitation interface
- Welcome dashboard

#### API Key Management (AI-14)
**User Story**: As a developer, I can generate/rotate API keys.

**Requirements**:
- API key generation/rotation in < 2 seconds
- Keys hashed at rest with industry-standard encryption
- Multiple keys per user/organization
- Key usage tracking and analytics

**UI Components**:
- API key management dashboard
- Key generation modal
- Usage analytics per key
- Security settings panel

#### First Prompt Experience (AI-15)
**User Story**: As a developer, I can send my first prompt in < 3 minutes.

**Requirements**:
- OpenAI API specification compliance
- TTFT p50 ≤ 10ms on reference model
- Interactive code examples
- Real-time response display

**UI Components**:
- Interactive API playground
- Code snippet generator
- Response viewer with metrics
- Getting started tutorial

### Epic 2: API Gateway (AI-2)

#### OpenAI-Compatible Endpoints (AI-18)
**User Story**: As an ML engineer, I can call /v1/chat/completions and /v1/embeddings.

**API Specifications**:
```
POST /v1/chat/completions
POST /v1/embeddings
GET /v1/models
POST /v1/completions
```

**Performance Requirements**:
- P95 TTFT ≤ 10ms
- 99.99% uptime SLA
- Request/response logging (configurable)
- Rate limiting with graceful degradation

#### Rate Limiting & Quotas (AI-20)
**User Story**: As an SRE, I can enforce per-key RPM/tokens/min and burst caps.

**Requirements**:
- Configurable rate limits per API key
- Burst capacity configuration
- Real-time quota monitoring
- HTTP 429 responses with retry hints

**UI Components**:
- Rate limit configuration panel
- Real-time usage monitoring
- Alert configuration interface

### Epic 3: Model Catalog & Versioning (AI-3)

#### Model Catalog (AI-22)
**User Story**: As a user, I can list supported models with latency and $/token pricing.

**Requirements**:
- Model metadata (name, version, capabilities)
- Real-time latency metrics
- Transparent pricing information
- Model availability by region

**UI Components**:
- Searchable model catalog
- Model detail pages with metrics
- Pricing comparison table
- Performance benchmarks

**API Specification**:
```json
GET /v1/models
{
  "data": [
    {
      "id": "llama-2-7b",
      "object": "model",
      "created": 1677610602,
      "owned_by": "meta",
      "pricing": {
        "input_tokens": 0.0001,
        "output_tokens": 0.0002
      },
      "performance": {
        "ttft_p50": 8.5,
        "tpot_p50": 12.3
      },
      "regions": ["us-east-1", "eu-west-1"]
    }
  ]
}
```

### Epic 4: Model Backend & Routing (AI-4)

#### Multi-Backend Support (AI-26)
**User Story**: As an SRE, I can deploy LLM backends on GPU nodes with autoscaling.

**Requirements**:
- vLLM/Triton integration for GPU backends
- SambaNova RDU integration
- Automatic backend health checking
- Load balancing across backends

#### Failover Management (AI-28)
**User Story**: As an SRE, I can failover from RDU to GPU on outage within 90 seconds.

**Requirements**:
- Automated failover detection
- Cross-platform model compatibility
- Graceful traffic migration
- Incident notification system

### Epic 5: Performance & Autoscaling (AI-5)

#### Auto-batching (AI-30)
**User Story**: As a performance engineer, I can enable micro-batching to optimize TTFT and TPOT.

**Requirements**:
- Dynamic batch size optimization
- Latency-aware batching
- Per-model configuration
- Real-time performance metrics

#### SLO Monitoring (AI-31)
**User Story**: As an SRE, I track SLOs for key performance indicators.

**Requirements**:
- TTFT, TPOT, error rate tracking
- Global synthetic canary tests every minute
- SLO violation alerting
- Performance degradation detection

**UI Components**:
- Real-time SLO dashboard
- Historical performance trends
- Alert configuration
- Incident timeline

### Epic 6: Billing & Plans (AI-6)

#### Stripe Integration (AI-33)
**User Story**: As a billing system, I integrate with Stripe for payment processing.

**Requirements**:
- Model pricing synchronization to Stripe
- Per-user usage reporting via Stripe meters
- Automatic billing threshold enforcement
- Usage-based and subscription billing

#### Usage Metering (AI-34)
**User Story**: As Finance, I see per-organization token usage and cost by model/region.

**Requirements**:
- Real-time usage tracking
- Cost allocation by model/region
- Exportable usage reports
- Budget threshold alerts

**UI Components**:
- Usage dashboard with filtering
- Cost breakdown charts
- Export functionality
- Budget management interface

#### Freemium & Credits (AI-35)
**User Story**: As Growth, I can grant promotional credits and freemium limits.

**Requirements**:
- Credit system with expiration
- Freemium tier with usage limits
- Promotional credit management
- Automatic tier upgrades

---

## Technical Architecture

### System Architecture Overview

```
[Client Apps] → [API Gateway] → [Model Router] → [Compute Backends]
                      ↓               ↓              ↓
                [Rate Limiter]  [Load Balancer]  [SambaNova RDU]
                      ↓               ↓              ↓
                [Auth Service]  [Health Check]   [GPU Clusters]
                      ↓               ↓              ↓
                [Billing API]   [Metrics API]    [Edge Nodes]
```

### Performance Requirements

| Metric | Target | Measurement |
|--------|--------|-------------|
| TTFT P50 | ≤ 10ms | Time to first token |
| TTFT P95 | ≤ 50ms | 95th percentile |
| TPOT P50 | ≤ 15ms | Time per output token |
| Availability | ≥ 99.99% | Monthly uptime |
| Error Rate | ≤ 0.1% | Failed requests |

### Compute Platform Integration

#### GPU Backend (NVIDIA H100/H200)
- vLLM for efficient serving
- TensorRT optimization
- Multi-GPU scaling
- Air-cooled infrastructure

#### SambaNova RDU Backend
- Native RDU integration
- Custom model compilation
- Specialized routing logic
- Partner API integration

#### Edge Deployment
- Containerized model serving
- Edge-optimized inference
- Reduced latency for regional traffic
- Offline capability planning

---

## User Experience Requirements

### Onboarding Flow
1. **Landing Page** → Registration
2. **Account Creation** → Email verification
3. **Organization Setup** → Team configuration
4. **API Key Generation** → First request tutorial
5. **Success Confirmation** → Dashboard redirect

**Target Time**: < 3 minutes from landing to first API call

### Developer Console Layout

#### Navigation Structure
```
Dashboard
├── API Playground
├── Models
│   ├── Catalog
│   ├── Deployments
│   └── Performance
├── Usage & Billing
│   ├── Analytics
│   ├── Invoices
│   └── Budget Alerts
├── Settings
│   ├── API Keys
│   ├── Organization
│   ├── Security
│   └── Compliance
└── Documentation
    ├── API Reference
    ├── SDKs
    └── Tutorials
```

#### Key UI Components

**Model Catalog Cards**:
```
[Model Icon] Model Name                    [Status Badge]
Framework: PyTorch | Context: 32k tokens
Pricing: $0.0015/1k input • $0.002/1k output
Latency: ~12ms TTFT • 99.9% availability
[Deploy] [View Details] [Benchmark]
```

**Usage Analytics Dashboard**:
- Real-time request volume charts
- Cost breakdown by model and region
- Performance metrics with SLO indicators
- Error rate monitoring with drill-down capability

**API Playground Interface**:
- Model selection dropdown
- Parameter configuration panel
- Request/response viewer with syntax highlighting
- Code generation for multiple languages
- Performance metrics display

### Mobile Responsiveness
- Responsive design for tablets (768px+)
- Mobile-friendly monitoring views
- Touch-optimized controls
- Progressive web app capability

---

## API Design Specifications

### Authentication
```
Authorization: Bearer sk-mara-...
Content-Type: application/json
```

### Chat Completions API
```json
POST /v1/chat/completions
{
  "model": "llama-2-7b",
  "messages": [
    {"role": "user", "content": "Hello, world!"}
  ],
  "max_tokens": 100,
  "temperature": 0.7,
  "stream": false
}
```

### Embeddings API
```json
POST /v1/embeddings
{
  "model": "text-embedding-ada-002",
  "input": "The quick brown fox",
  "encoding_format": "float"
}
```

### Models API
```json
GET /v1/models
{
  "object": "list",
  "data": [...]
}
```

### Error Handling
```json
{
  "error": {
    "type": "rate_limit_exceeded",
    "message": "Rate limit exceeded. Try again in 60 seconds.",
    "code": "rate_limit_exceeded",
    "retry_after": 60
  }
}
```

---

## Security & Compliance Features

### Data Sovereignty
- **Region Locking**: Hard-pin workloads to specific regions
- **Zero-Logging**: Configurable data retention policies
- **Audit Trails**: Tamper-evident logs for compliance

### Security Controls
- **TLS 1.3**: Encryption in transit
- **KMS Integration**: Encryption at rest
- **API Key Rotation**: Automated and manual rotation
- **Access Controls**: Role-based permissions

### Compliance Certifications (Planned)
- SOC 2 Type II
- ISO 27001
- GDPR compliance
- CCPA compliance

---

## Success Metrics & KPIs

### Technical Metrics
- **TTFT P50**: ≤ 10ms (target: 8ms)
- **Availability**: ≥ 99.99% (target: 99.995%)
- **Error Rate**: ≤ 0.1% (target: 0.05%)
- **Customer Onboarding**: ≤ 3 minutes (target: 2 minutes)

### Business Metrics
- **Design Partners**: 2 signed by Dec 2025
- **Gross Margin**: > 40% on all deployments
- **NPS Score**: ≥ 30 from design partners
- **Customer Expansion**: 2 requests for additional regions

### User Experience Metrics
- **Time to First Request**: < 3 minutes
- **API Documentation Score**: > 4.5/5
- **Support Ticket Resolution**: < 24 hours
- **Developer Satisfaction**: > 85%

---

## Implementation Timeline

### Phase 1: MVP (August - September 2025)
**Status**: In Progress
- ✅ Basic API Gateway (AI-2)
- ✅ Model Catalog (AI-3)
- 🔄 OpenAI-compatible endpoints (AI-18)
- 🔄 User registration & API keys (AI-13, AI-14)
- 🔄 GPU backend integration (AI-26)

### Phase 2: Production Ready (October - November 2025)
**Status**: Planned
- ⏳ Billing integration (AI-33, AI-34)
- ⏳ Performance monitoring (AI-31)
- ⏳ Developer documentation (AI-48)
- ⏳ Security features (AI-39, AI-40)

### Phase 3: Scale & Optimize (December 2025)
**Status**: Roadmap
- 📋 SambaNova backend (AI-25)
- 📋 Marketplace integration (AI-46)
- 📋 Advanced compliance (AI-8)
- 📋 Autoscaling optimization (AI-5)

### Backlog Items
- SDKs for Python/JavaScript (AI-19)
- A/B traffic splitting (AI-24)
- Advanced spend management (AI-7)
- Public status page (AI-45)

---

## Risk Mitigation

### Technical Risks
1. **Performance Targets**: Continuous benchmarking and optimization
2. **Multi-Backend Complexity**: Phased rollout with fallback options
3. **Scale Challenges**: Load testing and capacity planning

### Business Risks
1. **Customer Acquisition**: Design partner program and proof-of-concept deployments
2. **Competitive Pressure**: Differentiation through sovereignty and performance
3. **Partnership Dependencies**: Diversified compute provider strategy

### Operational Risks
1. **Incident Response**: 24/7 on-call rotation and runbooks
2. **Security Vulnerabilities**: Regular security audits and penetration testing
3. **Compliance Requirements**: Proactive certification and audit preparation

---

## Appendix

### JIRA Epic Mapping
- **AI-1**: Onboarding & Console API layer
- **AI-2**: API Gateway
- **AI-3**: Model Catalog & Versioning
- **AI-4**: Model Backend & Routing
- **AI-5**: Performance & Autoscaling
- **AI-6**: Billing & Plans
- **AI-7**: Spend Management & Alerts (Backlog)
- **AI-8**: Sovereignty, Security & Compliance (Backlog)
- **AI-9**: Observability & Reliability (Backlog)
- **AI-10**: Marketplace & Capacity Router
- **AI-11**: Documentation, Help & SEO
- **AI-12**: Legal & Commercial (Backlog)

### Reference Documents
- [Inference as a Service - OKRs 2025](https://marathondh.atlassian.net/wiki/spaces/AI/pages/773226624/Inference+as+a+Service+-+OKRs+2025+WIP)
- [AI Inference Project Space](https://marathondh.atlassian.net/wiki/spaces/AI/)
- [JIRA Project: AI Inference](https://marathondh.atlassian.net/browse/AI)

---