interface ProfileHeaderProps {
    heading:string
}
export const ProfileHeader = ({heading}:ProfileHeaderProps) => {
    return(
        <div>
            <h1 className="font-heading text-3xl md:text-4xl">{heading}</h1>
        </div>
    )
}