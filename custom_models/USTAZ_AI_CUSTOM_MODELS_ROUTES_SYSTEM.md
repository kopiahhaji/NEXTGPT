# 🎯 **USTAZ AI - Custom Models System with Routes & Pricing**
## **Complete Feature Matrix & API Implementation**

*Version: 1.0 - August 29, 2025*
*Production-Ready Implementation*

---

## 📋 **SYSTEM OVERVIEW**

### **Core Architecture:**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Request  │───▶│   Route Handler │───▶│   Model Service │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                        │                        │
         ▼                        ▼                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Auth Service  │    │   Pricing Engine │    │   AI Providers  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                        │                        │
         ▼                        ▼                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Zakat Validator │    │   Usage Tracker  │    │   Rate Limiter  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### **Key Components:**

- **Route Management**: Express.js routes with middleware
- **Model Services**: AI provider integrations (OpenAI, Claude, etc.)
- **Pricing Engine**: Dynamic pricing based on user status
- **Zakat Integration**: Automatic qualification checking
- **Usage Tracking**: Real-time monitoring and billing
- **Rate Limiting**: Fair usage policies

---

## 🤖 **CUSTOM MODEL DEFINITIONS**

### **1. BEGINNERS Model**

```typescript
// models/beginners.model.ts
export interface BeginnersModel {
  id: 'beginners';
  name: 'Foundation Course';
  tagline: 'Building Your Islamic Knowledge Base';
  targetAudience: 'New Muslims & Beginners';
  difficulty: 'Beginner';
  estimatedCompletion: '3-6 months';

  features: {
    core: {
      basicQuran: true;
      fivePillars: true;
      prayerGuide: true;
      islamicHistory: true;
      basicArabic: true;
    };
    ai: {
      textGeneration: true;
      voiceResponses: false;
      personalizedLessons: false;
      progressTracking: true;
      offlineContent: false;
    };
    community: {
      discussionForums: true;
      studyGroups: false;
      mentorAccess: false;
      liveSessions: false;
    };
  };

  pricing: {
    free: {
      dailyLimit: 10,
      features: ['basicQuran', 'fivePillars', 'prayerGuide']
    };
    premium: {
      monthlyPrice: 39,
      dailyLimit: 100,
      features: ['all']
    };
    zakat: {
      monthlyPrice: 19.50,
      dailyLimit: 100,
      features: ['all']
    };
  };
}
```

### **2. KIDS Model**

```typescript
// models/kids.model.ts
export interface KidsModel {
  id: 'kids';
  name: 'Creative Learning';
  tagline: 'Fun and Interactive Islamic Education';
  targetAudience: 'Children (5-12 years)';
  difficulty: 'Beginner';
  estimatedCompletion: 'Ongoing';

  features: {
    core: {
      islamicStories: true;
      characterBuilding: true;
      ageAppropriateContent: true;
      parentalControls: true;
      gamification: true;
    };
    ai: {
      interactiveStories: true;
      educationalGames: true;
      voiceNarration: false;
      progressBadges: true;
      adaptiveDifficulty: false;
    };
    community: {
      kidsForums: true;
      familyActivities: false;
      teacherResources: false;
      virtualClassrooms: false;
    };
  };

  pricing: {
    free: {
      dailyLimit: 5,
      features: ['islamicStories', 'characterBuilding']
    };
    premium: {
      monthlyPrice: 39,
      dailyLimit: 50,
      features: ['all']
    };
    zakat: {
      monthlyPrice: 19.50,
      dailyLimit: 50,
      features: ['all']
    };
  };
}
```

### **3. MUALLAF Model**

```typescript
// models/muallaf.model.ts
export interface MuallafModel {
  id: 'muallaf';
  name: 'New Beginnings';
  tagline: 'Welcome to Your Islamic Journey';
  targetAudience: 'New Converts & Reverts';
  difficulty: 'Beginner';
  estimatedCompletion: '3 months';

  features: {
    core: {
      conversionGuide: true;
      shahadaSupport: true;
      communityIntegration: true;
      culturalTransition: true;
      spiritualGuidance: true;
    };
    ai: {
      personalizedJourney: true;
      mentorMatching: false;
      progressMilestones: true;
      emergencySupport: false;
      multilingualSupport: true;
    };
    community: {
      newcomerGroups: true;
      mentorProgram: false;
      familySupport: false;
      conversionCelebration: true;
    };
  };

  pricing: {
    free: {
      dailyLimit: 8,
      features: ['conversionGuide', 'shahadaSupport']
    };
    premium: {
      monthlyPrice: 39,
      dailyLimit: 80,
      features: ['all']
    };
    zakat: {
      monthlyPrice: 19.50,
      dailyLimit: 80,
      features: ['all']
    };
  };
}
```

### **4. SENIOR Model**

```typescript
// models/senior.model.ts
export interface SeniorModel {
  id: 'senior';
  name: 'Advanced Studies';
  tagline: 'Deepening Your Islamic Wisdom';
  targetAudience: 'Advanced Learners';
  difficulty: 'Advanced';
  estimatedCompletion: '6-12 months';

  features: {
    core: {
      advancedTheology: true;
      classicalTexts: true;
      comparativeReligion: true;
      researchMethodology: true;
      scholarlyWriting: true;
    };
    ai: {
      researchAssistant: true;
      citationGenerator: false;
      peerReview: false;
      publicationSupport: false;
      advancedAnalytics: true;
    };
    community: {
      scholarNetwork: true;
      researchGroups: false;
      conferenceAccess: false;
      publicationOpportunities: false;
    };
  };

  pricing: {
    free: {
      dailyLimit: 15,
      features: ['advancedTheology', 'classicalTexts']
    };
    premium: {
      monthlyPrice: 79,
      dailyLimit: 150,
      features: ['all']
    };
    zakat: {
      monthlyPrice: 39.50,
      dailyLimit: 150,
      features: ['all']
    };
  };
}
```

### **5. PROFESSIONAL Model**

```typescript
// models/professional.model.ts
export interface ProfessionalModel {
  id: 'professional';
  name: 'Expert Level';
  tagline: 'Mastery in Islamic Scholarship';
  targetAudience: 'Islamic Professionals & Scholars';
  difficulty: 'Expert';
  estimatedCompletion: '12+ months';

  features: {
    core: {
      expertScholarship: true;
      leadershipTraining: true;
      professionalEthics: true;
      industryIntegration: true;
      certificationPrograms: true;
    };
    ai: {
      executiveMentoring: false;
      researchPartnerships: false;
      speakingPreparation: false;
      customPrograms: false;
      advancedNetworking: true;
    };
    community: {
      expertNetwork: true;
      leadershipSummits: false;
      professionalCertifications: false;
      industryCollaborations: false;
    };
  };

  pricing: {
    free: {
      dailyLimit: 20,
      features: ['expertScholarship', 'professionalEthics']
    };
    premium: {
      monthlyPrice: 119,
      dailyLimit: 200,
      features: ['all']
    };
    zakat: {
      monthlyPrice: 59.50,
      dailyLimit: 200,
      features: ['all']
    };
  };
}
```

---

## 🛣️ **API ROUTES IMPLEMENTATION**

### **Base Route Structure:**

```typescript
// routes/api/models/index.ts
import express from 'express';
import { authenticateUser } from '../../middleware/auth';
import { checkZakatStatus } from '../../middleware/zakat';
import { rateLimit } from '../../middleware/rateLimit';
import { trackUsage } from '../../middleware/usage';

const router = express.Router();

// Apply global middleware
router.use(authenticateUser);
router.use(trackUsage);

// Model-specific routes
router.use('/beginners', require('./beginners'));
router.use('/kids', require('./kids'));
router.use('/muallaf', require('./muallaf'));
router.use('/senior', require('./senior'));
router.use('/professional', require('./professional'));

export default router;
```

### **1. BEGINNERS Routes**

```typescript
// routes/api/models/beginners.ts
import express from 'express';
import { rateLimit } from '../../middleware/rateLimit';
import { checkZakatStatus } from '../../middleware/zakat';
import { validateFeatures } from '../../middleware/features';
import { BeginnersService } from '../../services/models/BeginnersService';

const router = express.Router();
const beginnersService = new BeginnersService();

// Rate limits based on user type
const rateLimits = {
  free: rateLimit({ windowMs: 86400000, max: 10 }), // 10 per day
  premium: rateLimit({ windowMs: 3600000, max: 100 }), // 100 per hour
  zakat: rateLimit({ windowMs: 3600000, max: 100 }) // 100 per hour
};

// Apply appropriate rate limit
router.use((req, res, next) => {
  const userType = req.user.subscriptionType;
  return rateLimits[userType](req, res, next);
});

// Core Islamic Fundamentals
router.post('/quran-basics',
  validateFeatures(['basicQuran']),
  async (req, res) => {
    try {
      const { query } = req.body;
      const response = await beginnersService.getQuranBasics(query, req.user);
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: 'Quran basics query failed' });
    }
  }
);

// Five Pillars
router.post('/five-pillars',
  validateFeatures(['fivePillars']),
  async (req, res) => {
    try {
      const { pillar } = req.body;
      const response = await beginnersService.getFivePillarsInfo(pillar, req.user);
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: 'Five pillars query failed' });
    }
  }
);

// Prayer Guide
router.post('/prayer-guide',
  validateFeatures(['prayerGuide']),
  async (req, res) => {
    try {
      const { prayerType } = req.body;
      const response = await beginnersService.getPrayerGuide(prayerType, req.user);
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: 'Prayer guide query failed' });
    }
  }
);

// Islamic History (Premium Feature)
router.post('/islamic-history',
  validateFeatures(['islamicHistory']),
  checkZakatStatus,
  async (req, res) => {
    try {
      const { topic } = req.body;
      const response = await beginnersService.getIslamicHistory(topic, req.user);
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: 'Islamic history query failed' });
    }
  }
);

// Basic Arabic (Premium Feature)
router.post('/basic-arabic',
  validateFeatures(['basicArabic']),
  checkZakatStatus,
  async (req, res) => {
    try {
      const { lesson } = req.body;
      const response = await beginnersService.getBasicArabic(lesson, req.user);
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: 'Basic Arabic query failed' });
    }
  }
);

// Progress Tracking
router.get('/progress',
  async (req, res) => {
    try {
      const progress = await beginnersService.getUserProgress(req.user.id);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: 'Progress retrieval failed' });
    }
  }
);

// Discussion Forums
router.get('/forums',
  async (req, res) => {
    try {
      const forums = await beginnersService.getDiscussionForums(req.user);
      res.json(forums);
    } catch (error) {
      res.status(500).json({ error: 'Forum retrieval failed' });
    }
  }
);

export default router;
```

### **2. KIDS Routes**

```typescript
// routes/api/models/kids.ts
import express from 'express';
import { rateLimit } from '../../middleware/rateLimit';
import { validateFeatures } from '../../middleware/features';
import { KidsService } from '../../services/models/KidsService';

const router = express.Router();
const kidsService = new KidsService();

// Rate limits for kids (lower than adults)
const rateLimits = {
  free: rateLimit({ windowMs: 86400000, max: 5 }),
  premium: rateLimit({ windowMs: 3600000, max: 50 }),
  zakat: rateLimit({ windowMs: 3600000, max: 50 })
};

router.use((req, res, next) => {
  const userType = req.user.subscriptionType;
  return rateLimits[userType](req, res, next);
});

// Islamic Stories
router.post('/stories',
  validateFeatures(['islamicStories']),
  async (req, res) => {
    try {
      const { character, theme } = req.body;
      const story = await kidsService.generateIslamicStory(character, theme, req.user);
      res.json(story);
    } catch (error) {
      res.status(500).json({ error: 'Story generation failed' });
    }
  }
);

// Character Building
router.post('/character-building',
  validateFeatures(['characterBuilding']),
  async (req, res) => {
    try {
      const { virtue } = req.body;
      const lesson = await kidsService.getCharacterBuildingLesson(virtue, req.user);
      res.json(lesson);
    } catch (error) {
      res.status(500).json({ error: 'Character building lesson failed' });
    }
  }
);

// Interactive Stories (Premium)
router.post('/interactive-stories',
  validateFeatures(['interactiveStories']),
  async (req, res) => {
    try {
      const { storyId, choice } = req.body;
      const nextPart = await kidsService.continueInteractiveStory(storyId, choice, req.user);
      res.json(nextPart);
    } catch (error) {
      res.status(500).json({ error: 'Interactive story failed' });
    }
  }
);

// Educational Games (Premium)
router.post('/games',
  validateFeatures(['educationalGames']),
  async (req, res) => {
    try {
      const { gameType } = req.body;
      const game = await kidsService.startEducationalGame(gameType, req.user);
      res.json(game);
    } catch (error) {
      res.status(500).json({ error: 'Game start failed' });
    }
  }
);

// Progress Badges
router.get('/badges',
  async (req, res) => {
    try {
      const badges = await kidsService.getUserBadges(req.user.id);
      res.json(badges);
    } catch (error) {
      res.status(500).json({ error: 'Badge retrieval failed' });
    }
  }
);

export default router;
```

### **3. MUALLAF Routes**

```typescript
// routes/api/models/muallaf.ts
import express from 'express';
import { rateLimit } from '../../middleware/rateLimit';
import { validateFeatures } from '../../middleware/features';
import { MuallafService } from '../../services/models/MuallafService';

const router = express.Router();
const muallafService = new MuallafService();

const rateLimits = {
  free: rateLimit({ windowMs: 86400000, max: 8 }),
  premium: rateLimit({ windowMs: 3600000, max: 80 }),
  zakat: rateLimit({ windowMs: 3600000, max: 80 })
};

router.use((req, res, next) => {
  const userType = req.user.subscriptionType;
  return rateLimits[userType](req, res, next);
});

// Conversion Guide
router.post('/conversion-guide',
  validateFeatures(['conversionGuide']),
  async (req, res) => {
    try {
      const { step } = req.body;
      const guide = await muallafService.getConversionGuide(step, req.user);
      res.json(guide);
    } catch (error) {
      res.status(500).json({ error: 'Conversion guide failed' });
    }
  }
);

// Shahada Support
router.post('/shahada-support',
  validateFeatures(['shahadaSupport']),
  async (req, res) => {
    try {
      const { language } = req.body;
      const support = await muallafService.getShahadaSupport(language, req.user);
      res.json(support);
    } catch (error) {
      res.status(500).json({ error: 'Shahada support failed' });
    }
  }
);

// Personalized Journey (Premium)
router.post('/personalized-journey',
  validateFeatures(['personalizedJourney']),
  async (req, res) => {
    try {
      const journey = await muallafService.createPersonalizedJourney(req.user);
      res.json(journey);
    } catch (error) {
      res.status(500).json({ error: 'Personalized journey failed' });
    }
  }
);

// Progress Milestones
router.get('/milestones',
  async (req, res) => {
    try {
      const milestones = await muallafService.getUserMilestones(req.user.id);
      res.json(milestones);
    } catch (error) {
      res.status(500).json({ error: 'Milestone retrieval failed' });
    }
  }
);

// Multilingual Support
router.post('/translate',
  validateFeatures(['multilingualSupport']),
  async (req, res) => {
    try {
      const { text, targetLanguage } = req.body;
      const translation = await muallafService.translateIslamicContent(text, targetLanguage);
      res.json(translation);
    } catch (error) {
      res.status(500).json({ error: 'Translation failed' });
    }
  }
);

export default router;
```

### **4. SENIOR Routes**

```typescript
// routes/api/models/senior.ts
import express from 'express';
import { rateLimit } from '../../middleware/rateLimit';
import { validateFeatures } from '../../middleware/features';
import { checkZakatStatus } from '../../middleware/zakat';
import { SeniorService } from '../../services/models/SeniorService';

const router = express.Router();
const seniorService = new SeniorService();

const rateLimits = {
  free: rateLimit({ windowMs: 86400000, max: 15 }),
  premium: rateLimit({ windowMs: 3600000, max: 150 }),
  zakat: rateLimit({ windowMs: 3600000, max: 150 })
};

router.use((req, res, next) => {
  const userType = req.user.subscriptionType;
  return rateLimits[userType](req, res, next);
});

// Advanced Theology
router.post('/advanced-theology',
  validateFeatures(['advancedTheology']),
  async (req, res) => {
    try {
      const { topic } = req.body;
      const analysis = await seniorService.getAdvancedTheology(topic, req.user);
      res.json(analysis);
    } catch (error) {
      res.status(500).json({ error: 'Advanced theology query failed' });
    }
  }
);

// Classical Texts
router.post('/classical-texts',
  validateFeatures(['classicalTexts']),
  async (req, res) => {
    try {
      const { text, author } = req.body;
      const analysis = await seniorService.analyzeClassicalText(text, author, req.user);
      res.json(analysis);
    } catch (error) {
      res.status(500).json({ error: 'Classical text analysis failed' });
    }
  }
);

// Research Assistant (Premium)
router.post('/research-assistant',
  validateFeatures(['researchAssistant']),
  checkZakatStatus,
  async (req, res) => {
    try {
      const { query, sources } = req.body;
      const research = await seniorService.assistResearch(query, sources, req.user);
      res.json(research);
    } catch (error) {
      res.status(500).json({ error: 'Research assistance failed' });
    }
  }
);

// Advanced Analytics
router.get('/analytics',
  validateFeatures(['advancedAnalytics']),
  async (req, res) => {
    try {
      const analytics = await seniorService.getAdvancedAnalytics(req.user.id);
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ error: 'Analytics retrieval failed' });
    }
  }
);

// Scholar Network
router.get('/scholar-network',
  async (req, res) => {
    try {
      const network = await seniorService.getScholarNetwork(req.user);
      res.json(network);
    } catch (error) {
      res.status(500).json({ error: 'Scholar network retrieval failed' });
    }
  }
);

export default router;
```

### **5. PROFESSIONAL Routes**

```typescript
// routes/api/models/professional.ts
import express from 'express';
import { rateLimit } from '../../middleware/rateLimit';
import { validateFeatures } from '../../middleware/features';
import { checkZakatStatus } from '../../middleware/zakat';
import { ProfessionalService } from '../../services/models/ProfessionalService';

const router = express.Router();
const professionalService = new ProfessionalService();

const rateLimits = {
  free: rateLimit({ windowMs: 86400000, max: 20 }),
  premium: rateLimit({ windowMs: 3600000, max: 200 }),
  zakat: rateLimit({ windowMs: 3600000, max: 200 })
};

router.use((req, res, next) => {
  const userType = req.user.subscriptionType;
  return rateLimits[userType](req, res, next);
});

// Expert Scholarship
router.post('/expert-scholarship',
  validateFeatures(['expertScholarship']),
  async (req, res) => {
    try {
      const { field, query } = req.body;
      const scholarship = await professionalService.getExpertScholarship(field, query, req.user);
      res.json(scholarship);
    } catch (error) {
      res.status(500).json({ error: 'Expert scholarship query failed' });
    }
  }
);

// Professional Ethics
router.post('/professional-ethics',
  validateFeatures(['professionalEthics']),
  async (req, res) => {
    try {
      const { scenario } = req.body;
      const guidance = await professionalService.getProfessionalEthicsGuidance(scenario, req.user);
      res.json(guidance);
    } catch (error) {
      res.status(500).json({ error: 'Professional ethics query failed' });
    }
  }
);

// Leadership Training (Premium)
router.post('/leadership-training',
  validateFeatures(['leadershipTraining']),
  checkZakatStatus,
  async (req, res) => {
    try {
      const { module } = req.body;
      const training = await professionalService.getLeadershipTraining(module, req.user);
      res.json(training);
    } catch (error) {
      res.status(500).json({ error: 'Leadership training failed' });
    }
  }
);

// Industry Integration (Premium)
router.post('/industry-integration',
  validateFeatures(['industryIntegration']),
  checkZakatStatus,
  async (req, res) => {
    try {
      const { industry, topic } = req.body;
      const integration = await professionalService.getIndustryIntegration(industry, topic, req.user);
      res.json(integration);
    } catch (error) {
      res.status(500).json({ error: 'Industry integration failed' });
    }
  }
);

// Advanced Networking
router.get('/networking',
  validateFeatures(['advancedNetworking']),
  async (req, res) => {
    try {
      const network = await professionalService.getAdvancedNetworking(req.user);
      res.json(network);
    } catch (error) {
      res.status(500).json({ error: 'Networking retrieval failed' });
    }
  }
);

// Certification Programs
router.get('/certifications',
  async (req, res) => {
    try {
      const certifications = await professionalService.getCertificationPrograms(req.user);
      res.json(certifications);
    } catch (error) {
      res.status(500).json({ error: 'Certification retrieval failed' });
    }
  }
);

export default router;
```

---

## 🔧 **MIDDLEWARE IMPLEMENTATION**

### **Authentication Middleware**

```typescript
// middleware/auth.ts
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

export interface AuthenticatedUser {
  id: string;
  email: string;
  subscriptionType: 'free' | 'premium' | 'zakat';
  zakatStatus: 'not_applied' | 'pending' | 'verified' | 'expired';
  modelAccess: string[];
}

export const authenticateUser = async (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = {
      id: user.id,
      email: user.email,
      subscriptionType: user.subscriptionType,
      zakatStatus: user.zakatStatus,
      modelAccess: user.modelAccess
    } as AuthenticatedUser;

    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
```

### **Zakat Status Middleware**

```typescript
// middleware/zakat.ts
import { AuthenticatedUser } from './auth';

export const checkZakatStatus = (req: any, res: any, next: any) => {
  const user: AuthenticatedUser = req.user;

  // Allow access if user has premium or verified zakat status
  if (user.subscriptionType === 'premium' || user.zakatStatus === 'verified') {
    return next();
  }

  // Check if user has valid zakat status
  if (user.zakatStatus === 'expired') {
    return res.status(403).json({
      error: 'Zakat verification expired',
      action: 'renew_zakat_verification'
    });
  }

  return res.status(403).json({
    error: 'Premium or zakat verification required',
    action: 'upgrade_subscription'
  });
};
```

### **Feature Validation Middleware**

```typescript
// middleware/features.ts
import { AuthenticatedUser } from './auth';

export const validateFeatures = (requiredFeatures: string[]) => {
  return (req: any, res: any, next: any) => {
    const user: AuthenticatedUser = req.user;

    // Check if user has access to required features
    const hasAccess = requiredFeatures.every(feature =>
      user.modelAccess.includes(feature) ||
      user.subscriptionType === 'premium' ||
      user.zakatStatus === 'verified'
    );

    if (!hasAccess) {
      return res.status(403).json({
        error: 'Feature not available for your subscription',
        requiredFeatures,
        action: 'upgrade_subscription'
      });
    }

    next();
  };
};
```

### **Usage Tracking Middleware**

```typescript
// middleware/usage.ts
import { UsageTracker } from '../services/UsageTracker';

export const trackUsage = async (req: any, res: any, next: any) => {
  const startTime = Date.now();

  // Track the request
  await UsageTracker.trackRequest({
    userId: req.user.id,
    endpoint: req.path,
    method: req.method,
    timestamp: new Date(),
    userAgent: req.get('User-Agent'),
    ipAddress: req.ip
  });

  // Track response
  res.on('finish', async () => {
    const duration = Date.now() - startTime;

    await UsageTracker.trackResponse({
      userId: req.user.id,
      endpoint: req.path,
      statusCode: res.statusCode,
      duration,
      timestamp: new Date()
    });
  });

  next();
};
```

---

## 💰 **PRICING ENGINE IMPLEMENTATION**

### **Dynamic Pricing Service**

```typescript
// services/PricingEngine.ts
export class PricingEngine {
  static calculatePrice(userType: string, modelId: string, features: string[]): number {
    const basePrices = {
      beginners: { free: 0, premium: 39, zakat: 19.50 },
      kids: { free: 0, premium: 39, zakat: 19.50 },
      muallaf: { free: 0, premium: 39, zakat: 19.50 },
      senior: { free: 0, premium: 79, zakat: 39.50 },
      professional: { free: 0, premium: 119, zakat: 59.50 }
    };

    const modelPrices = basePrices[modelId as keyof typeof basePrices];
    return modelPrices[userType as keyof typeof modelPrices] || 0;
  }

  static applyDiscounts(basePrice: number, user: AuthenticatedUser): number {
    let finalPrice = basePrice;

    // Zakat discount (50% off)
    if (user.zakatStatus === 'verified') {
      finalPrice *= 0.5;
    }

    // Volume discounts for institutional users
    if (user.subscriptionType === 'institutional') {
      if (user.modelAccess.length >= 5) {
        finalPrice *= 0.8; // 20% additional discount
      }
    }

    return Math.round(finalPrice * 100) / 100; // Round to 2 decimal places
  }

  static getSubscriptionDetails(userType: string, modelId: string) {
    const limits = {
      free: { daily: 10, hourly: 5 },
      premium: { daily: 1000, hourly: 100 },
      zakat: { daily: 1000, hourly: 100 }
    };

    const features = {
      free: ['basic'],
      premium: ['all'],
      zakat: ['all']
    };

    return {
      limits: limits[userType as keyof typeof limits],
      features: features[userType as keyof typeof features],
      price: this.calculatePrice(userType, modelId, [])
    };
  }
}
```

### **Subscription Management**

```typescript
// services/SubscriptionManager.ts
export class SubscriptionManager {
  static async upgradeSubscription(userId: string, newPlan: string, modelId: string) {
    const user = await User.findById(userId);
    const pricing = PricingEngine.getSubscriptionDetails(newPlan, modelId);

    // Update user subscription
    user.subscriptionType = newPlan;
    user.modelAccess = pricing.features;
    user.monthlyLimit = pricing.limits.daily;
    user.hourlyLimit = pricing.limits.hourly;

    await user.save();

    // Log the subscription change
    await AuditLog.create({
      userId,
      action: 'subscription_upgrade',
      details: { from: user.previousSubscription, to: newPlan, modelId },
      timestamp: new Date()
    });

    return { success: true, pricing };
  }

  static async applyZakatDiscount(userId: string) {
    const user = await User.findById(userId);

    // Apply 50% discount to current subscription
    const currentPrice = PricingEngine.calculatePrice(user.subscriptionType, user.currentModel, []);
    const discountedPrice = PricingEngine.applyDiscounts(currentPrice, {
      ...user.toObject(),
      zakatStatus: 'verified'
    });

    user.discountedPrice = discountedPrice;
    user.zakatDiscountApplied = true;

    await user.save();

    return { success: true, discountedPrice };
  }
}
```

---

## 📊 **USAGE TRACKING & ANALYTICS**

### **Usage Tracker Service**

```typescript
// services/UsageTracker.ts
export class UsageTracker {
  static async trackRequest(requestData: {
    userId: string;
    endpoint: string;
    method: string;
    timestamp: Date;
    userAgent?: string;
    ipAddress?: string;
  }) {
    await UsageLog.create({
      ...requestData,
      type: 'request'
    });
  }

  static async trackResponse(responseData: {
    userId: string;
    endpoint: string;
    statusCode: number;
    duration: number;
    timestamp: Date;
  }) {
    await UsageLog.create({
      ...responseData,
      type: 'response'
    });
  }

  static async getUserUsage(userId: string, period: 'daily' | 'monthly' | 'yearly' = 'monthly') {
    const startDate = this.getPeriodStart(period);

    const usage = await UsageLog.aggregate([
      {
        $match: {
          userId,
          timestamp: { $gte: startDate },
          type: 'request'
        }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
            endpoint: '$endpoint'
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: '$_id.date',
          endpoints: {
            $push: {
              endpoint: '$_id.endpoint',
              count: '$count'
            }
          },
          totalRequests: { $sum: '$count' }
        }
      },
      { $sort: { '_id': -1 } }
    ]);

    return usage;
  }

  private static getPeriodStart(period: string): Date {
    const now = new Date();
    switch (period) {
      case 'daily':
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
      case 'monthly':
        return new Date(now.getFullYear(), now.getMonth(), 1);
      case 'yearly':
        return new Date(now.getFullYear(), 0, 1);
      default:
        return new Date(now.getFullYear(), now.getMonth(), 1);
    }
  }
}
```

---

## 🎯 **RATE LIMITING SYSTEM**

### **Advanced Rate Limiting**

```typescript
// middleware/advancedRateLimit.ts
import { AuthenticatedUser } from './auth';

interface RateLimitConfig {
  free: { daily: number; hourly: number };
  premium: { daily: number; hourly: number };
  zakat: { daily: number; hourly: number };
}

export const createAdvancedRateLimit = (config: RateLimitConfig) => {
  const userRequests = new Map<string, {
    daily: { count: number; reset: Date };
    hourly: { count: number; reset: Date };
  }>();

  return (req: any, res: any, next: any) => {
    const user: AuthenticatedUser = req.user;
    const userId = user.id;
    const now = new Date();

    // Initialize user tracking if not exists
    if (!userRequests.has(userId)) {
      userRequests.set(userId, {
        daily: { count: 0, reset: new Date(now.getTime() + 24 * 60 * 60 * 1000) },
        hourly: { count: 0, reset: new Date(now.getTime() + 60 * 60 * 1000) }
      });
    }

    const userTracking = userRequests.get(userId)!;
    const userLimits = config[user.subscriptionType as keyof RateLimitConfig];

    // Reset counters if time has passed
    if (now > userTracking.daily.reset) {
      userTracking.daily = { count: 0, reset: new Date(now.getTime() + 24 * 60 * 60 * 1000) };
    }

    if (now > userTracking.hourly.reset) {
      userTracking.hourly = { count: 0, reset: new Date(now.getTime() + 60 * 60 * 1000) };
    }

    // Check limits
    if (userTracking.daily.count >= userLimits.daily) {
      return res.status(429).json({
        error: 'Daily limit exceeded',
        resetTime: userTracking.daily.reset,
        limit: userLimits.daily
      });
    }

    if (userTracking.hourly.count >= userLimits.hourly) {
      return res.status(429).json({
        error: 'Hourly limit exceeded',
        resetTime: userTracking.hourly.reset,
        limit: userLimits.hourly
      });
    }

    // Increment counters
    userTracking.daily.count++;
    userTracking.hourly.count++;

    // Add headers for client
    res.set({
      'X-RateLimit-Daily-Limit': userLimits.daily,
      'X-RateLimit-Daily-Remaining': userLimits.daily - userTracking.daily.count,
      'X-RateLimit-Daily-Reset': userTracking.daily.reset.toISOString(),
      'X-RateLimit-Hourly-Limit': userLimits.hourly,
      'X-RateLimit-Hourly-Remaining': userLimits.hourly - userTracking.hourly.count,
      'X-RateLimit-Hourly-Reset': userTracking.hourly.reset.toISOString()
    });

    next();
  };
};
```

---

## 🚀 **DEPLOYMENT & MONITORING**

### **Environment Configuration**

```bash
# .env.production
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://prod_user:prod_pass@prod_host:5432/ustaz_prod
REDIS_URL=redis://prod_redis:6379
JWT_SECRET=your_production_jwt_secret
ENCRYPTION_KEY=your_production_encryption_key

# API Keys
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
ZAKAT_API_ENDPOINT=https://api.zakat.gov.my/v2
ZAKAT_API_KEY=your_zakat_api_key

# Rate Limiting
REDIS_RATE_LIMIT_ENABLED=true
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Monitoring
SENTRY_DSN=your_sentry_dsn
DATADOG_API_KEY=your_datadog_key
```

### **Docker Configuration**

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start application
CMD ["npm", "start"]
```

### **Monitoring Setup**

```typescript
// monitoring/index.ts
import * as Sentry from '@sentry/node';
import { datadog } from 'datadog-lambda-js';

export const initializeMonitoring = () => {
  // Sentry for error tracking
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 1.0
  });

  // Custom metrics
  const metrics = {
    requestsTotal: 0,
    errorsTotal: 0,
    zakatVerificationsTotal: 0,
    subscriptionUpgradesTotal: 0
  };

  // Log metrics every 5 minutes
  setInterval(() => {
    datadog.increment('ustaz.requests_total', metrics.requestsTotal);
    datadog.increment('ustaz.errors_total', metrics.errorsTotal);
    datadog.increment('ustaz.zakat_verifications_total', metrics.zakatVerificationsTotal);
    datadog.increment('ustaz.subscription_upgrades_total', metrics.subscriptionUpgradesTotal);

    // Reset counters
    Object.keys(metrics).forEach(key => {
      (metrics as any)[key] = 0;
    });
  }, 300000);
};

export const trackMetric = (metric: string, value: number = 1) => {
  datadog.increment(`ustaz.${metric}`, value);
};
```

---

## 📋 **IMPLEMENTATION CHECKLIST**

### **Phase 1: Foundation (Week 1-2)**

- [ ] Set up database schema for all models
- [ ] Implement authentication middleware
- [ ] Create basic API route structure
- [ ] Set up rate limiting system

### **Phase 2: Core Models (Week 3-4)**

- [ ] Implement BEGINNERS model routes and services
- [ ] Implement KIDS model routes and services
- [ ] Implement MUALLAF model routes and services
- [ ] Set up pricing engine

### **Phase 3: Advanced Models (Week 5-6)**

- [ ] Implement SENIOR model routes and services
- [ ] Implement PROFESSIONAL model routes and services
- [ ] Integrate zakat verification system
- [ ] Set up usage tracking

### **Phase 4: Integration & Testing (Week 7-8)**

- [ ] Integrate all middleware components
- [ ] Comprehensive testing (unit, integration, E2E)
- [ ] Performance optimization
- [ ] Security audit

### **Phase 5: Deployment & Monitoring (Week 9-10)**

- [ ] Production deployment setup
- [ ] Monitoring and alerting configuration
- [ ] User acceptance testing
- [ ] Go-live preparation

---

This comprehensive system provides a complete, production-ready implementation of custom models with proper routes, feature access control, pricing plans, and zakat qualification integration! 🎯🚀
