import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import '../styles/Billing.css';

function Billing() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [billingInfo, setBillingInfo] = useState({
    plan: 'Professional',
    planPrice: 99,
    billingCycle: 'monthly',
    nextBillingDate: '2026-05-13',
    paymentMethod: '**** **** **** 4242',
    cardExpiry: '12/28'
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  const invoices = [
    { id: 1, date: '2026-04-13', amount: '$99.00', status: 'Paid', plan: 'Professional' },
    { id: 2, date: '2026-03-13', amount: '$99.00', status: 'Paid', plan: 'Professional' },
    { id: 3, date: '2026-02-13', amount: '$99.00', status: 'Paid', plan: 'Professional' },
    { id: 4, date: '2026-01-13', amount: '$99.00', status: 'Paid', plan: 'Professional' }
  ];

  const plans = [
    {
      name: 'Starter',
      price: 29,
      description: 'Perfect for startups',
      features: [
        'Up to 100 candidate profiles',
        'Basic AI sourcing',
        '2 team members',
        'Email support',
        'Basic analytics'
      ]
    },
    {
      name: 'Professional',
      price: 99,
      description: 'For growing teams',
      features: [
        'Unlimited candidate profiles',
        'Advanced AI sourcing',
        'Up to 10 team members',
        'Priority support',
        'Advanced analytics',
        'Custom branding'
      ],
      recommended: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations',
      features: [
        'Everything in Professional',
        'Dedicated account manager',
        'Custom integrations',
        'SLA guarantee',
        'White-label solution',
        'Advanced security'
      ]
    }
  ];

  return (
    <div className="billing-container">
      <Navigation />

      <div className="billing-content">
        <header className="billing-header">
          <h1>Billing & Plans</h1>
          <p>Manage your subscription, payments, and invoices</p>
        </header>

        <div className="billing-tabs">
          <button
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`tab-btn ${activeTab === 'plans' ? 'active' : ''}`}
            onClick={() => setActiveTab('plans')}
          >
            Plans
          </button>
          <button
            className={`tab-btn ${activeTab === 'invoices' ? 'active' : ''}`}
            onClick={() => setActiveTab('invoices')}
          >
            Invoices
          </button>
          <button
            className={`tab-btn ${activeTab === 'payment' ? 'active' : ''}`}
            onClick={() => setActiveTab('payment')}
          >
            Payment Method
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="billing-section">
            <div className="current-plan-card">
              <div className="plan-header">
                <h2>Current Plan</h2>
                <span className="plan-badge active">Active</span>
              </div>

              <div className="plan-details">
                <div className="plan-item">
                  <span className="plan-label">Plan Name</span>
                  <span className="plan-value">{billingInfo.plan}</span>
                </div>

                <div className="plan-item">
                  <span className="plan-label">Price</span>
                  <span className="plan-value">${billingInfo.planPrice}/{billingInfo.billingCycle}</span>
                </div>

                <div className="plan-item">
                  <span className="plan-label">Billing Cycle</span>
                  <span className="plan-value capitalize">{billingInfo.billingCycle}</span>
                </div>

                <div className="plan-item">
                  <span className="plan-label">Next Billing Date</span>
                  <span className="plan-value">{billingInfo.nextBillingDate}</span>
                </div>

                <div className="plan-item">
                  <span className="plan-label">Payment Method</span>
                  <span className="plan-value">{billingInfo.paymentMethod}</span>
                </div>
              </div>

              <div className="plan-actions">
                <button className="btn btn-secondary">Change Plan</button>
                <button className="btn btn-secondary">Download Invoice</button>
              </div>
            </div>
          </div>
        )}

        {/* Plans Tab */}
        {activeTab === 'plans' && (
          <div className="billing-section">
            <h2 className="section-title">Choose Your Plan</h2>
            <div className="plans-grid">
              {plans.map((plan, idx) => (
                <div key={idx} className={`plan-card ${plan.recommended ? 'recommended' : ''}`}>
                  {plan.recommended && <span className="recommended-badge">Recommended</span>}
                  
                  <h3>{plan.name}</h3>
                  <p className="plan-description">{plan.description}</p>
                  
                  <div className="plan-pricing">
                    {typeof plan.price === 'number' ? (
                      <>
                        <span className="price">${plan.price}</span>
                        <span className="period">/month</span>
                      </>
                    ) : (
                      <span className="price">{plan.price}</span>
                    )}
                  </div>

                  <ul className="plan-features">
                    {plan.features.map((feature, i) => (
                      <li key={i}>
                        <span className="checkmark">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button className={`btn ${plan.recommended ? 'btn-primary' : 'btn-secondary'}`}>
                    {plan.name === billingInfo.plan ? 'Current Plan' : 'Upgrade'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Invoices Tab */}
        {activeTab === 'invoices' && (
          <div className="billing-section">
            <h2 className="section-title">Invoices</h2>
            <div className="invoices-table">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Plan</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map(invoice => (
                    <tr key={invoice.id}>
                      <td>{invoice.date}</td>
                      <td>{invoice.plan}</td>
                      <td className="amount">{invoice.amount}</td>
                      <td>
                        <span className={`status ${invoice.status.toLowerCase()}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn-link">Download</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Payment Method Tab */}
        {activeTab === 'payment' && (
          <div className="billing-section">
            <h2 className="section-title">Payment Method</h2>
            
            <div className="payment-method-card">
              <div className="card-info">
                <span className="card-icon">💳</span>
                <div className="card-details">
                  <p className="card-name">Visa</p>
                  <p className="card-number">{billingInfo.paymentMethod}</p>
                  <p className="card-expiry">Expires {billingInfo.cardExpiry}</p>
                </div>
              </div>
              <button className="btn btn-danger">Remove</button>
            </div>

            <div className="add-payment">
              <h3>Add New Payment Method</h3>
              <button className="btn btn-primary">+ Add Card</button>
            </div>

            <div className="billing-address">
              <h3>Billing Address</h3>
              <div className="address-form">
                <div className="form-row">
                  <input type="text" placeholder="Street Address" className="form-input" />
                  <input type="text" placeholder="Apt, Suite, etc." className="form-input" />
                </div>
                <div className="form-row">
                  <input type="text" placeholder="City" className="form-input" />
                  <input type="text" placeholder="State" className="form-input" />
                  <input type="text" placeholder="Zip Code" className="form-input" />
                </div>
                <button className="btn btn-secondary">Update Address</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Billing;
