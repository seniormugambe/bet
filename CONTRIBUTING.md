# Contributing to BetCelo

First off, thank you for considering contributing to BetCelo! It's people like you that make BetCelo such a great platform.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps to reproduce the problem**
* **Provide specific examples**
* **Describe the behavior you observed and what you expected**
* **Include screenshots if possible**
* **Include your environment details** (OS, browser, wallet, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a detailed description of the suggested enhancement**
* **Explain why this enhancement would be useful**
* **List some examples of how it would be used**

### Pull Requests

* Fill in the required template
* Follow the TypeScript/React style guide
* Include tests when adding features
* Update documentation as needed
* End all files with a newline

## Development Process

### 1. Fork & Clone

```bash
# Fork the repo on GitHub, then:
git clone https://github.com/your-username/betcelo.git
cd betcelo
```

### 2. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 3. Set Up Development Environment

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

### 4. Make Your Changes

* Write clean, readable code
* Follow existing code style
* Add comments for complex logic
* Write/update tests
* Update documentation

### 5. Test Your Changes

```bash
# Run tests
npx hardhat test

# Run linter
npm run lint

# Check TypeScript
npm run type-check

# Test build
npm run build
```

### 6. Commit Your Changes

```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "feat: add amazing feature"
```

#### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
* `feat`: New feature
* `fix`: Bug fix
* `docs`: Documentation changes
* `style`: Code style changes (formatting, etc.)
* `refactor`: Code refactoring
* `test`: Adding or updating tests
* `chore`: Maintenance tasks

**Examples:**
```
feat(staking): add platinum tier rewards
fix(betting): resolve odds calculation bug
docs(readme): update installation instructions
```

### 7. Push & Create Pull Request

```bash
# Push to your fork
git push origin feature/your-feature-name

# Go to GitHub and create a Pull Request
```

## Style Guide

### TypeScript

* Use TypeScript for all new code
* Define proper types/interfaces
* Avoid `any` type when possible
* Use meaningful variable names

```typescript
// Good
interface UserBet {
  id: string;
  amount: bigint;
  outcome: number;
}

// Bad
const data: any = { ... };
```

### React

* Use functional components with hooks
* Keep components small and focused
* Use proper prop types
* Handle loading and error states

```typescript
// Good
interface BetCardProps {
  bet: UserBet;
  onShare?: () => void;
}

const BetCard = ({ bet, onShare }: BetCardProps) => {
  // Component logic
};

export default BetCard;
```

### Smart Contracts

* Follow Solidity best practices
* Add NatSpec comments
* Include security checks
* Write comprehensive tests

```solidity
/**
 * @dev Place a bet on an outcome
 * @param outcomeIndex The index of the outcome to bet on
 */
function placeBet(uint256 outcomeIndex) external payable {
    require(msg.value > 0, "Bet amount must be greater than 0");
    require(!concluded, "Event has concluded");
    // ...
}
```

### CSS/Styling

* Use Tailwind CSS utility classes
* Follow mobile-first approach
* Use design system colors
* Keep styles consistent

```tsx
// Good
<div className="flex items-center gap-4 p-6 rounded-xl bg-card">
  <Button className="btn-kahoot-primary">Place Bet</Button>
</div>
```

## Project Structure

```
betcelo/
├── contracts/          # Smart contracts
├── scripts/            # Deployment scripts
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom hooks
│   ├── pages/          # Page components
│   ├── store/          # State management
│   ├── types/          # TypeScript types
│   └── config/         # Configuration
├── test/               # Tests
└── docs/               # Documentation
```

## Testing Guidelines

### Unit Tests

```typescript
describe('BettingFactory', () => {
  it('should create a binary event', async () => {
    const tx = await factory.createBinaryEvent(
      'Test Event',
      'Description',
      'Sports',
      86400,
      ['Yes', 'No']
    );
    expect(tx).to.emit(factory, 'EventCreated');
  });
});
```

### Integration Tests

* Test complete user flows
* Test contract interactions
* Test error handling
* Test edge cases

### Frontend Tests

* Test component rendering
* Test user interactions
* Test state management
* Test API calls

## Documentation

### Code Comments

* Add JSDoc comments for functions
* Explain complex logic
* Document assumptions
* Note TODOs clearly

```typescript
/**
 * Calculate potential payout for a bet
 * @param betAmount - Amount being bet in wei
 * @param outcomePool - Total pool for the outcome
 * @param totalPool - Total pool for all outcomes
 * @returns Potential payout in wei
 */
function calculatePayout(
  betAmount: bigint,
  outcomePool: bigint,
  totalPool: bigint
): bigint {
  // Implementation
}
```

### README Updates

* Update features list
* Add new configuration options
* Document new commands
* Update screenshots

### API Documentation

* Document all public functions
* Include parameter descriptions
* Provide usage examples
* Note return values

## Review Process

### What We Look For

* **Functionality**: Does it work as intended?
* **Code Quality**: Is it clean and maintainable?
* **Tests**: Are there adequate tests?
* **Documentation**: Is it well documented?
* **Performance**: Is it efficient?
* **Security**: Are there any vulnerabilities?

### Review Timeline

* Initial review: 1-3 days
* Follow-up reviews: 1-2 days
* Merge: After approval from maintainers

## Community

### Communication Channels

* **GitHub Issues**: Bug reports and feature requests
* **GitHub Discussions**: General discussions
* **Discord**: Real-time chat
* **Twitter**: Updates and announcements

### Getting Help

* Check existing documentation
* Search closed issues
* Ask in Discord
* Create a GitHub issue

## Recognition

Contributors will be:
* Listed in CONTRIBUTORS.md
* Mentioned in release notes
* Eligible for contributor NFTs (coming soon)
* Invited to contributor calls

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to BetCelo! 🎉
