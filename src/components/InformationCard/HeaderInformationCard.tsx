import { IHeaderInformationCardProps } from "./IHeaderInformationCardProps";
import InformationCard from "./InformationCard";

const HeaderInformationCard = ({title, description}: IHeaderInformationCardProps) => {
    return (
        <InformationCard 
            containerStyle={
                {
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'FFFFFF',
                    width: '95%',
                    justifyContent: 'end',
                    alignItems: 'start',
                    borderRadius: '20px',
                    paddingLeft: '1rem',
                    paddingBottom: '1rem',
                    boxShadow: '0px 2px #bab2c1'
                }}
            title={title}
            titleStyle={{
                fontSize: 'x-large',
                fontWeight: '700'
            }}
            description={description} 
            descriptionStyle={{
                fontSize: 'large',
                color: '#79747E'}}
        />
    )
}

export default HeaderInformationCard;