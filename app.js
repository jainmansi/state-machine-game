const { useState, useEffect } = React;

// State machine configuration based on the image
// Actions: clap = right, stand = up, wave = down
const stateMachine = {
    'Black': {
        clap: { nextState: 'Blue', reward: 0 },
        stand: { nextState: 'Red', reward: 0 },
        wave: { nextState: 'Green', reward: 0 }
    },
    'Blue': {
        clap: { nextState: 'Brown', reward: 0 },
        stand: { nextState: 'Blue', reward: 0 },
        wave: { nextState: 'Magenta', reward: 0 }
    },
    'Blue-Down': {
        clap: { nextState: 'Brown', reward: 0 },
        stand: { nextState: 'Magenta', reward: 0 },
        wave: { nextState: 'Blue', reward: 0 }
    },
    'Brown': {
        clap: { nextState: 'LightBlue', reward: 1 },
        stand: { nextState: 'Brown-Down', reward: 0 },
        wave: { nextState: 'White', reward: 0 }
    },
    'Brown-Down': {
        clap: { nextState: 'LightPink', reward: 2 },
        stand: { nextState: 'White', reward: 0 },
        wave: { nextState: 'Brown', reward: 0 }
    },
    'Green': {
        clap: { nextState: 'Magenta', reward: 0 },
        stand: { nextState: 'Black', reward: 10 },
        wave: { nextState: 'Red', reward: 0 }
    },
    'Magenta': {
        clap: { nextState: 'Magenta', reward: 0 },
        stand: { nextState: 'Blue', reward: 0 },
        wave: { nextState: 'Blue-Down', reward: 0 }
    },
    'White': {
        clap: { nextState: 'Yellow', reward: -3 },
        stand: { nextState: 'Brown', reward: 0 },
        wave: { nextState: 'Brown', reward: 0 }
    },
    'Red': {
        clap: { nextState: 'Blue-Down', reward: 0 },
        stand: { nextState: 'Red', reward: -1 },
        wave: { nextState: 'Black', reward: -1 }
    },
    'LightBlue': {
        clap: { nextState: 'Black', reward: 0 },
        stand: { nextState: 'LightPink', reward: 0 },
        wave: { nextState: 'Yellow', reward: -1 }
    },
    'Yellow': {
        clap: { nextState: 'Green', reward: 10 },
        stand: { nextState: 'LightBlue', reward: -1 },
        wave: { nextState: 'LightPink', reward: -1 }
    },
    'LightPink': {
        clap: { nextState: 'Red', reward: 0 },
        stand: { nextState: 'Yellow', reward: 0 },
        wave: { nextState: 'LightBlue', reward: 0 }
    }
};

function App() {
    const [currentState, setCurrentState] = useState('Black');
    const [totalReward, setTotalReward] = useState(0);
    const [lastAction, setLastAction] = useState('');

    const handleAction = (action) => {
        const stateConfig = stateMachine[currentState];
        if (stateConfig && stateConfig[action]) {
            const { nextState, reward } = stateConfig[action];
            setCurrentState(nextState);
            setTotalReward(prev => prev + reward);
            setLastAction(`${action} → ${reward >= 0 ? '+' : ''}${reward} points`);
        }
    };

    const getStateColorClass = (state) => {
        const colorMap = {
            'Black': 'state-black',
            'Blue': 'state-blue',
            'Brown': 'state-brown',
            'Green': 'state-green',
            'Magenta': 'state-magenta',
            'White': 'state-white',
            'Red': 'state-red',
            'LightBlue': 'state-lightblue',
            'Yellow': 'state-yellow',
            'LightPink': 'state-lightpink',
            'Blue-Down': 'state-blue'
        };
        return colorMap[state] || 'state-black';
    };

    useEffect(() => {
        document.body.className = getStateColorClass(currentState);
    }, [currentState]);

    return (
        <div className="app">
            <h1 className="title">State Machine App</h1>
            
            <div className="state-info">
                <div className="current-state">
                    Current State: {currentState.split('-')[0]}
                </div>
                <div className="reward">
                    Total Reward: {totalReward}
                </div>
                {lastAction && (
                    <div className="last-action" style={{color: '#FFD700', fontSize: '1.2rem', marginTop: '10px'}}>
                        Last Action: {lastAction}
                    </div>
                )}
            </div>

            <div className="buttons">
                <button 
                    className="btn btn-clap" 
                    onClick={() => handleAction('clap')}
                >
                    👏 Clap
                </button>
                <button 
                    className="btn btn-stand" 
                    onClick={() => handleAction('stand')}
                >
                    🧍 Stand
                </button>
                <button 
                    className="btn btn-wave" 
                    onClick={() => handleAction('wave')}
                >
                    👋 Wave
                </button>
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
