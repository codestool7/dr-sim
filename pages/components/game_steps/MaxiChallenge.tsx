import React from 'react';
import Season from '../../classes/Season';
import Header from '../lil_babies/Header';

type MaxiChallengeProps = {
    season: Season
}

export default class MaxiChallenge extends React.Component<MaxiChallengeProps, {}> {
    render() {
        return <div>
            <Header
                text="Maxi Challenge!"
            />
            {this.props.season &&
                <div className="mainPart" id="MainBlock">
                    
                </div>
            }
        </div>;
    }
}

/*

let challenges = ["actingChallenge()", "improvChallenge()", "marketingChallenge()", "danceChallenge()", "designChallenge()", "comedyChallenge()", "talentshow()"];
    //remove from possible challenges list:
    if (talentShowCounter || (all_stars || all_winners || lipsync_assassin))
        challenges.splice(challenges.indexOf("talentshow()"), 1);
    if (actingChallengeCounter == 3 && totalCastSize > 15 || actingChallengeCounter == 3 && totalCastSize <= 15)
        challenges.splice(challenges.indexOf("actingChallenge()"), 1);
    if (comedyChallengeCounter == 3 && totalCastSize > 15 || comedyChallengeCounter == 3 && totalCastSize <= 15)
        challenges.splice(challenges.indexOf("comedyChallenge()"), 1);
    if (marketingChallengeCounter == 3 && totalCastSize > 15 || marketingChallengeCounter == 3 && totalCastSize <= 15)
        challenges.splice(challenges.indexOf("marketingChallenge()"), 1);
    if (danceChallengeCounter == 2 && totalCastSize > 15 || danceChallengeCounter == 3 && totalCastSize <= 15)
        challenges.splice(challenges.indexOf("danceChallenge()"), 1);
    if (designChallengeCounter == 3 && totalCastSize > 15 || designChallengeCounter == 3 && totalCastSize <= 15)
        challenges.splice(challenges.indexOf("designChallenge()"), 1);
    if (improvChallengeCounter == 3&& totalCastSize > 15 || improvChallengeCounter == 3 && totalCastSize <= 15)
        challenges.splice(challenges.indexOf("improvChallenge()"), 1);
    createChallenge(challenges, miniChallengeScreen);

*/