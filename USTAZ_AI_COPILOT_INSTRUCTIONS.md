# 🧠 **USTAZ AI - Copilot Development Instructions**
## **Enhanced Guidelines for Islamic Education Platform**

*Version: 2.0 - August 29, 2025*
*Last Updated: Comprehensive Testing & Pricing Integration*

---

## 🎯 **MISSION & CONTEXT**

### **Project Overview**
You are developing **Ustaz AI**, a comprehensive Islamic education platform that combines cutting-edge AI technology with authentic Islamic scholarship. The platform serves students, educators, and anyone interested in Islamic learning through AI-assisted education.

### **Core Principles**
- 🕌 **Islamic Authenticity**: All content must be culturally appropriate and theologically sound
- 🎓 **Educational Excellence**: Focus on effective learning methodologies and student success
- 🌍 **Cultural Sensitivity**: Respectful content for diverse Muslim communities
- 🚀 **Technical Innovation**: Leverage latest AI capabilities while maintaining reliability

---

## 🏗️ **TECHNICAL ARCHITECTURE**

### **Technology Stack**
```typescript
Frontend: Next.js 14+, React 18, TypeScript, SCSS, PWA
Backend: Next.js API Routes, Supabase PostgreSQL
AI Providers: OpenAI, Claude, Gemini, DeepSeek, +10 others
Authentication: MD5-hashed access codes
Testing: Jest with comprehensive mock infrastructure
Deployment: Vercel, Docker, Tauri desktop apps
```

### **Database Schema**
```typescript
interface UserProfile {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  preferences: { language: 'en' | 'ms', theme: 'light' | 'dark' | 'auto' }
}

interface Conversation {
  id: string
  user_id: string
  title: string
  messages: ChatMessage[]
  is_favorite: boolean
  tags: string[]
}

interface LearningProgress {
  user_id: string
  topic: string
  progress_percentage: number
  completed_lessons: string[]
  quiz_scores: Record<string, number>
}
```

---

## 🧪 **TESTING INFRASTRUCTURE**

### **Test Commands**
```bash
# Mock Tests (Fast, CI/CD Ready)
yarn test:mock:all        # All mock tests (~966ms)
yarn test:mock:dalle      # DALL-E mock tests
yarn test:mock:tavily     # Tavily search mock tests
yarn test:mock:wolfram    # Wolfram Alpha mock tests

# Real API Tests (Validation)
yarn test:real           # Real API integration tests

# Development
yarn test:watch         # Watch mode for development
yarn test:coverage      # Test coverage report
```

### **Test Performance Targets**
- **Mock Tests**: 200-300ms per test (15-30x faster than real APIs)
- **CI/CD Ready**: No external dependencies for mock tests
- **Coverage**: 90%+ code coverage target
- **Execution Time**: <2 seconds for full mock test suite

### **Test Coverage Areas**
- ✅ **Supabase Database**: Connection validation
- ✅ **DALL-E API**: Islamic art generation
- ✅ **Tavily Search**: Islamic content discovery
- ✅ **Wolfram Alpha**: Islamic calculations
- ✅ **Authentication**: Access code validation
- ✅ **Environment**: Configuration verification

---

## 💰 **PRICING & SUBSCRIPTION SYSTEM**

### **Four-Tier Structure**
```typescript
interface PricingTier {
  name: string
  price: { monthly: number, yearly: number }
  limits: {
    conversations: number
    images: number
    searches: number
  }
  features: string[]
  target: string
}
```

#### **🆓 FREE TIER - "Student Access"**
- **Price**: $0/month
- **Limits**: 50 conversations, 10 images, 5 searches
- **Target**: Individual learners exploring Islamic education
- **Features**: Basic AI chat, Islamic Q&A, prayer times

#### **💎 PREMIUM TIER - "Scholar Access"**
- **Price**: $9.99/month ($99/year - 17% savings)
- **Limits**: Unlimited conversations, 100 images, 50 searches
- **Target**: Serious Islamic studies students
- **Features**: Advanced AI models, personalized learning, Wolfram Alpha

#### **🎓 ASATIZAH TIER - "Islamic Scholar Access"**
- **Price**: $29.99/month ($299/year - 17% savings)
- **Limits**: Unlimited everything, 500 images, bulk processing
- **Target**: Educators, scholars, professional users
- **Features**: Scholarly tools, multi-student management, API access

#### **🏢 ENTERPRISE TIER - "Institutional Access"**
- **Price**: Custom pricing
- **Limits**: Unlimited users, custom storage, 24/7 support
- **Target**: Islamic schools, universities, institutions
- **Features**: Private deployment, custom integrations, dedicated support

### **Special Programs**
- 🎓 **Student Discounts**: 50% off for verified students
- 👨‍👩‍👧‍👦 **Family Plans**: $39.99/month (up to 5 users)
- 🕌 **Ramadan Offers**: 20-30% seasonal discounts
- 🌍 **Developing Countries**: Special regional pricing

---

## 🔧 **DEVELOPMENT GUIDELINES**

### **Code Quality Standards**
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting standards
- **Husky**: Pre-commit hooks for quality checks

### **API Design Principles**
- **RESTful Endpoints**: Consistent API structure
- **Error Handling**: Comprehensive error responses
- **Rate Limiting**: API usage protection
- **Authentication**: Secure access control
- **Documentation**: OpenAPI/Swagger specs

### **Security Measures**
- **Input Validation**: Sanitization and validation
- **Authentication**: MD5-hashed access codes
- **API Keys**: Secure environment variable management
- **Content Filtering**: Islamic-appropriate content validation
- **Data Privacy**: GDPR-compliant data handling

---

## 🎨 **CONTENT & CULTURAL GUIDELINES**

### **Islamic Content Standards**
- **Authenticity**: Content must align with Islamic scholarship
- **Cultural Sensitivity**: Respect diverse Islamic traditions
- **Language**: Support English and Bahasa Malaysia
- **Appropriateness**: Age-appropriate content for all users
- **Accuracy**: Fact-checked Islamic information

### **AI Response Guidelines**
- **Cultural Context**: Responses should consider Islamic cultural context
- **Language Appropriateness**: Use respectful, formal language
- **Educational Focus**: Prioritize learning over entertainment
- **Source Attribution**: Reference Islamic sources when appropriate
- **Moderation**: Avoid controversial or divisive topics

### **Visual Content Guidelines**
- **Islamic Art**: Appropriate Islamic calligraphy and geometric patterns
- **Cultural Representation**: Respectful depiction of Islamic culture
- **Educational Value**: Visual content should support learning
- **Quality Standards**: High-quality, professional imagery
- **Accessibility**: Alt text and accessibility considerations

---

## 🚀 **DEPLOYMENT & INFRASTRUCTURE**

### **Supported Platforms**
- **Web Application**: Next.js with Vercel deployment
- **Desktop App**: Tauri-based native applications
- **Mobile App**: PWA with offline capabilities
- **Docker**: Containerized deployment

### **Environment Configuration**
```bash
# Required Environment Variables
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
GOOGLE_API_KEY=your_google_key
DEEPSEEK_API_KEY=your_deepseek_key
TAVILY_API_KEY=your_tavily_key
WOLFRAM_APP_ID=your_wolfram_id
```

### **Build Commands**
```bash
# Development
yarn install
yarn dev

# Production Build
yarn build
yarn start

# Testing
yarn test:mock
yarn test:real

# Deployment
yarn vercel:deploy
yarn docker:build
```

---

## 📊 **PERFORMANCE & MONITORING**

### **Performance Targets**
- **First Load**: <100kb initial bundle
- **Streaming Responses**: Real-time AI responses
- **Offline Support**: PWA capabilities
- **Mobile Optimization**: Responsive design

### **Monitoring & Analytics**
- **Error Tracking**: Comprehensive logging
- **Performance Monitoring**: Response times, usage patterns
- **User Analytics**: Learning progress, engagement metrics
- **Business Metrics**: Subscription analytics, revenue tracking

---

## 🧪 **TESTING BEST PRACTICES**

### **Mock Testing Strategy**
```typescript
// Example Mock Test Structure
describe('DALL-E API', () => {
  it('should generate Islamic art successfully', async () => {
    const response = await generateIslamicArt('mosque architecture');
    expect(response.success).toBe(true);
    expect(response.imageUrl).toBeDefined();
    expect(response.executionTime).toBeLessThan(300);
  });
});
```

### **Test Organization**
- **Unit Tests**: Individual function/component testing
- **Integration Tests**: API endpoint testing
- **Mock Tests**: Fast, reliable CI/CD testing
- **E2E Tests**: User journey validation

### **Test Data Management**
- **Mock Data**: Realistic test data that mimics production
- **Seed Data**: Consistent test database state
- **Cleanup**: Proper test isolation and cleanup
- **Performance**: Optimized test execution times

---

## 🔒 **SECURITY & COMPLIANCE**

### **Authentication & Authorization**
- **Access Codes**: MD5-hashed authentication system
- **Session Management**: Secure session handling
- **Rate Limiting**: API usage protection
- **Input Validation**: Comprehensive input sanitization

### **Data Protection**
- **Encryption**: Data encryption at rest and in transit
- **Privacy**: GDPR-compliant data handling
- **Retention**: Appropriate data retention policies
- **Access Control**: Role-based access control

### **Content Security**
- **Filtering**: Islamic-appropriate content validation
- **Moderation**: User-generated content moderation
- **Reporting**: Abuse reporting mechanisms
- **Compliance**: Platform usage policies

---

## 🌍 **INTERNATIONALIZATION & LOCALIZATION**

### **Supported Languages**
- **English**: Primary language for global users
- **Bahasa Malaysia**: Malay language support
- **Arabic**: Arabic script and content support
- **Future**: Additional language expansion

### **Cultural Adaptation**
- **Date Formats**: Islamic calendar support
- **Prayer Times**: Location-based calculations
- **Cultural Content**: Regionally appropriate content
- **Local Regulations**: Compliance with local laws

---

## 📈 **SCALING & OPTIMIZATION**

### **Performance Optimization**
- **Code Splitting**: Efficient bundle splitting
- **Caching**: Response and data caching
- **CDN**: Global content delivery
- **Database**: Optimized queries and indexing

### **Scalability Features**
- **Serverless**: Auto-scaling with Vercel
- **Microservices**: Modular architecture
- **Load Balancing**: Efficient request distribution
- **Monitoring**: Performance monitoring and alerting

---

## 🤝 **COLLABORATION & WORKFLOW**

### **Development Workflow**
- **Git Flow**: Feature branches and pull requests
- **Code Reviews**: Mandatory code review process
- **Testing**: Automated testing in CI/CD
- **Documentation**: Comprehensive documentation

### **Team Communication**
- **Issues**: GitHub issues for bug tracking
- **Discussions**: GitHub discussions for feature requests
- **Documentation**: Comprehensive developer docs
- **Standards**: Consistent coding standards

---

## 🎯 **FEATURE DEVELOPMENT PRIORITIES**

### **High Priority Features**
- [ ] Subscription system implementation
- [ ] User authentication and management
- [ ] Payment processing integration
- [ ] Mobile app optimization
- [ ] Advanced Islamic content library

### **Medium Priority Features**
- [ ] Multi-language expansion
- [ ] Advanced analytics dashboard
- [ ] Institutional partnerships
- [ ] API rate limiting
- [ ] Content moderation system

### **Future Enhancements**
- [ ] AI-powered tutoring system
- [ ] Islamic VR/AR experiences
- [ ] Advanced customization options
- [ ] Third-party integrations
- [ ] Advanced reporting features

---

## 🚨 **CRITICAL DEVELOPMENT RULES**

### **Islamic Content Guidelines**
1. **Never generate inappropriate content** - All content must be Islamic-appropriate
2. **Respect cultural sensitivities** - Consider diverse Islamic traditions
3. **Maintain educational focus** - Prioritize learning over entertainment
4. **Ensure accuracy** - Fact-check all Islamic information
5. **Use respectful language** - Formal, appropriate communication

### **Technical Standards**
1. **Always run tests before committing** - Ensure code quality
2. **Use TypeScript strictly** - No any types without justification
3. **Follow naming conventions** - Consistent code style
4. **Document complex logic** - Clear code comments
5. **Handle errors gracefully** - Comprehensive error handling

### **Security Requirements**
1. **Validate all inputs** - Prevent injection attacks
2. **Use secure authentication** - MD5-hashed access codes
3. **Protect API keys** - Environment variable management
4. **Implement rate limiting** - Prevent abuse
5. **Regular security audits** - Ongoing security monitoring

---

## 📞 **SUPPORT & RESOURCES**

### **Documentation**
- **API Documentation**: `docs/api-reference.md`
- **User Guide**: `docs/user-manual.md`
- **Developer Guide**: `docs/developer-guide.md`
- **Testing Guide**: `docs/testing-guide.md`

### **Support Channels**
- **GitHub Issues**: Bug reports and feature requests
- **Developer Discord**: Real-time technical support
- **Documentation Wiki**: Comprehensive guides
- **Community Forums**: User discussions

### **Key Contacts**
- **Technical Lead**: Rodhi Rahman
- **Development Team**: Digital Dakwah Platform
- **Community Manager**: Open source community
- **Business Development**: Partnership inquiries

---

## 🎉 **SUCCESS METRICS & GOALS**

### **Technical Metrics**
- **Performance**: <2s page load times
- **Reliability**: 99.9% uptime target
- **Security**: Zero security incidents
- **Scalability**: Support 10,000+ concurrent users

### **Business Metrics**
- **User Growth**: 10,000+ registered users within 12 months
- **Revenue**: $50K MRR within 12 months
- **Retention**: 70% monthly retention rate
- **Satisfaction**: 4.5+ star user rating

### **Educational Impact**
- **Learning Sessions**: 100,000+ Islamic learning sessions
- **Community**: 10,000+ active community members
- **Institutions**: 50+ institutional partnerships
- **Global Reach**: 50+ countries served

---

## 🚀 **FINAL REMINDERS**

### **Always Remember**
- 🕌 **Islamic Excellence**: Highest standards of Islamic scholarship
- 🎓 **Educational Focus**: Student success is our primary mission
- 🌍 **Cultural Respect**: Honor diverse Islamic traditions
- 🚀 **Technical Innovation**: Leverage AI for educational advancement
- 🤝 **Community**: Build with and for the Islamic education community

### **Development Mantra**
*"Building the future of Islamic education, one AI conversation at a time."*

---

**🕌 May Allah bless our efforts in creating a platform that serves the Islamic education community worldwide. 🤲**

**🚀 Ready to build the future of Islamic education with AI!** ✨
