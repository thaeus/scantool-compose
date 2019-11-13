import React, { Component } from 'react';
import { GET_LIST, GET_MANY, Responsive, withDataProvider } from 'react-admin';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

import Welcome from './Welcome';
import MonthlyRevenue from './MonthlyRevenue';
import NbNewOrders from './NbNewOrders';
import PendingOrders from './PendingOrders';
import PendingReviews from './PendingReviews';
import NewCustomers from './NewCustomers';
import ReactCardFlip from 'react-card-flip';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import Card from 'react-playing-card'
import PubSub from 'pubsub-js';

const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '1em' },
    rightCol: { flex: 1, marginLeft: '1em' },
    singleCol: { marginTop: '2em', marginBottom: '2em' },
};

class Dashboard extends Component {
    state = {};


    constructor(props) {
        super(props);
        this.state = {
          showScanner: true,
          video: 'qpT5Md4TPJg',
          toggler: false,
          result: 'No result',
          isFull: false,
          isFlipped1: false,
          isFlipped2: false,
          isFlipped3: false,
          isFlipped4: false,
          message: 'Get your walmart receipts and start scanning!',
          error: false,
          card1: {}
        };
        this.handleClick1 = this.handleClick1.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
        this.handleClick3 = this.handleClick3.bind(this);
        this.handleClick4 = this.handleClick4.bind(this);
        this.card1ScanSubscriber = this.card1ScanSubscriber.bind(this);


        PubSub.subscribe('card1.scan', this.card1ScanSubscriber);
        
      }

    card1ScanSubscriber(msg,data) {
        this.setState({ card1: data });
        return;
    }


    componentDidMount() {
        this.fetchData();
    }



    componentDidUpdate(prevProps) {
        // handle refresh
        if (this.props.version !== prevProps.version) {
            this.fetchData();
        }
    }

    fetchData() {
        this.fetchOrders();
        this.fetchCustomers();
    }

    async fetchOrders() {
        const { dataProvider } = this.props;
        const aMonthAgo = new Date();
        aMonthAgo.setDate(aMonthAgo.getDate() - 30);
        const { data: recentOrders } = await dataProvider(
            GET_LIST,
            'commands',
            {
                filter: { date_gte: aMonthAgo.toISOString() },
                sort: { field: 'date', order: 'DESC' },
                pagination: { page: 1, perPage: 50 },
            }
        );
        const aggregations = recentOrders
            .filter(order => order.status !== 'cancelled')
            .reduce(
                (stats, order) => {
                    if (order.status !== 'cancelled') {
                        stats.revenue += order.total;
                        stats.nbNewOrders++;
                    }
                    if (order.status === 'ordered') {
                        stats.pendingOrders.push(order);
                    }
                    return stats;
                },
                {
                    revenue: 0,
                    nbNewOrders: 0,
                    pendingOrders: [],
                }
            );
        this.setState({
            revenue: aggregations.revenue.toLocaleString(undefined, {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }),
            nbNewOrders: aggregations.nbNewOrders,
            pendingOrders: aggregations.pendingOrders,
        });
        const { data: customers } = await dataProvider(GET_MANY, 'customers', {
            ids: aggregations.pendingOrders.map(order => order.customer_id),
        });
        this.setState({
            pendingOrdersCustomers: customers.reduce((prev, customer) => {
                prev[customer.id] = customer; // eslint-disable-line no-param-reassign
                return prev;
            }, {}),
        });
    }

    async fetchCustomers() {
        const { dataProvider } = this.props;
        const aMonthAgo = new Date();
        aMonthAgo.setDate(aMonthAgo.getDate() - 30);
        const { data: newCustomers } = await dataProvider(
            GET_LIST,
            'customers',
            {
                filter: {
                    has_ordered: true,
                    first_seen_gte: aMonthAgo.toISOString(),
                },
                sort: { field: 'first_seen', order: 'DESC' },
                pagination: { page: 1, perPage: 100 },
            }
        );
        this.setState({
            newCustomers,
            nbNewCustomers: newCustomers.reduce(nb => ++nb, 0),
        });
    }

    
    handleClick1(e) {
         e.preventDefault();
         this.setState(prevState => ({ isFlipped1: !prevState.isFlipped1 }));
    }

    handleClick2(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped2: !prevState.isFlipped2 }));
   }

   handleClick3(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped3: !prevState.isFlipped3 }));
   }

    handleClick4(e) {
         e.preventDefault();
         this.setState(prevState => ({ isFlipped4: !prevState.isFlipped4 }));
    }

    //start here and fill in rank and suit
    getCard(pcard,stateVar,clickFunction) {
        pcard = {
            "rank": 7,
            "suit": "s"
        };

        const flipper = 
        <div> 
            <ReactCardFlip isFlipped={stateVar} flipDirection="horizontal">
            <div key="front">
                <Card rank={this.state.card1.number} suit={this.state.card1.suit} />
            </div>
            <div key="back">
                <Card rank="7" suit="S" />
            </div>
            </ReactCardFlip>
            <CardActions style={{ justifyContent: 'center' }}>
                <Button onClick={clickFunction}>
                    <HomeIcon style={{ paddingRight: '0.5em' }} />
                        See other candidate
                </Button>
            </CardActions> 
        </div>
      ;
        return flipper;
    }
      
    render() {
        const {
            nbNewCustomers,
            nbNewOrders,
            nbPendingReviews,
            newCustomers,
            pendingOrders,
            pendingOrdersCustomers,
            pendingReviews,
            pendingReviewsCustomers,
            revenue,
        } = this.state;
        return (
            <Responsive
                xsmall={
                    <div>
                        <div style={styles.flexColumn}>
                            <div style={{ marginBottom: '2em' }}>
                                <Welcome />
                            </div>
                            <div>
                                {this.getCard(this.state.card1,this.state.isFlipped1,this.handleClick1)}
                            </div>
                        </div>
                    </div>
                }
                small={
                    <div style={styles.flexColumn}>
                        <div style={styles.singleCol}>
                            <Welcome />
                        </div>
                        <div >
                        {this.getCard(this.state.card1,this.state.isFlipped1,this.handleClick1)}

                            </div>
                    </div>
                }
                medium={
                    <div style={styles.flex}>
                        <div style={styles.leftCol}>
                            <div style={styles.singleCol}>
                                <Welcome />
                            </div>
                            <div style={styles.flex}>
                                {this.getCard(this.state.card1,this.state.isFlipped1,this.handleClick1)}
                            </div>
                        </div>
                    </div>
                }
            />
        );
    }
}

const mapStateToProps = state => ({
    version: state.admin.ui.viewVersion,
});

export default compose(
    connect(mapStateToProps),
    withDataProvider
)(Dashboard);
