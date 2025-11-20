import type { Route } from "./+types/article";

export const meta = ({}: Route.MetaArgs) => [{ title: "Core dump" }];

export default function Article({ params }: Route.LoaderArgs) {
  return (
    <div className="overflow-y-auto w-full px-50 text-justify space-y-5">
      params: {JSON.stringify(params)}
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
        dignissim enim mauris, ac volutpat mi vulputate ut. Vivamus efficitur,
        diam in vulputate dictum, magna tortor gravida dolor, eu condimentum
        augue ligula sit amet libero. Duis eu nulla quis ante mollis aliquam.
        Sed pharetra at orci eu scelerisque. In eu dui in nulla mattis rhoncus
        eu vitae libero. Praesent quis fringilla augue. Fusce ut libero eget
        enim fringilla posuere. Nullam ut dapibus nisi. Donec sed molestie nunc.
      </p>
      <p>
        Sed id venenatis mi, ac luctus eros. Pellentesque habitant morbi
        tristique senectus et netus et malesuada fames ac turpis egestas.
        Aliquam erat volutpat. Aliquam erat volutpat. Vestibulum sem sapien,
        molestie sit amet ligula et, scelerisque porta nunc. Curabitur dictum
        finibus augue in commodo. Phasellus tempor erat ut lectus lacinia, eu
        volutpat ante pulvinar. Phasellus vel nulla at tellus mattis eleifend
        non sit amet urna. Vivamus nec interdum felis. Proin dapibus, neque at
        luctus malesuada, nulla leo egestas erat, eget sollicitudin nibh elit
        nec tortor. Sed ac enim eget leo iaculis porta eu sed lorem. Mauris
        maximus odio lectus, nec congue neque sodales ac. Donec accumsan
        pellentesque leo quis molestie. In hac habitasse platea dictumst.
      </p>
      <p>
        Aenean auctor aliquam erat nec pulvinar. In sollicitudin imperdiet ante
        id viverra. Nam et eros purus. Integer sollicitudin sem a nibh pretium,
        nec ornare enim tincidunt. Sed interdum arcu fermentum, tincidunt quam
        in, fermentum dolor. Mauris mollis nisi eu orci egestas, eget pulvinar
        justo fringilla. Aenean posuere ante vitae magna dignissim lobortis.
        Aenean quis urna eget libero placerat bibendum. Pellentesque iaculis
        mattis massa vel viverra.
      </p>
      <p>
        Mauris nec efficitur mi. Aenean fringilla pretium dignissim. Duis
        fermentum enim enim, id luctus turpis suscipit eu. Duis ac massa nisl.
        Maecenas metus mi, ultrices eget auctor ac, ornare eu urna. Proin
        consectetur enim ut nunc viverra elementum. Maecenas tincidunt mauris
        non cursus congue. Ut bibendum orci id urna tincidunt aliquet. Ut quis
        sem sollicitudin, blandit arcu sed, porttitor dolor. Proin egestas
        semper est malesuada placerat. Ut semper magna eu fermentum tincidunt.
      </p>
      <p>
        Nullam sit amet mauris justo. Vestibulum leo leo, iaculis sagittis
        consequat vitae, accumsan vitae lectus. Morbi vulputate id libero at
        posuere. Fusce commodo nisl odio, id placerat lacus pharetra vitae. Sed
        a nibh rhoncus, fermentum justo in, maximus nisl. Fusce bibendum eget
        erat at efficitur. Mauris vitae maximus dui. Etiam id dolor leo.
      </p>

      <p>
        Nullam ut sapien a orci ultrices egestas. Praesent ultricies volutpat
        risus, eu placerat magna laoreet eget. Aliquam arcu arcu, elementum et
        turpis non, vestibulum consequat libero. Morbi finibus ante in nulla
        vulputate, at aliquam arcu gravida. Morbi porta nisi sed varius sodales.
        Sed pulvinar iaculis lobortis. Sed id tempus risus, at feugiat turpis.
        Cras vitae purus id ligula porta gravida. Curabitur ac faucibus nisl,
        vitae auctor massa. Aenean vel sagittis sapien. Proin posuere lorem id
        nisi feugiat mollis. In hac habitasse platea dictumst. Interdum et
        malesuada fames ac ante ipsum primis in faucibus. Aliquam ac nunc nec
        est tempor fermentum. Duis consequat lacus odio, a aliquam dolor dictum
        ac.
      </p>
      <p>
        Cras quis dolor at justo vehicula commodo. Fusce commodo quis lectus
        vitae commodo. Aenean convallis vehicula ipsum, facilisis auctor velit
        aliquet non. Suspendisse pretium magna ex, vitae elementum mi vehicula
        accumsan. Mauris aliquam nunc non ligula varius tincidunt. Nam dapibus
        elit nec sodales interdum. Donec tempus faucibus felis nec accumsan.
        Proin interdum est nisi, vitae accumsan dui luctus eu. Vivamus maximus
        vel nisl ac malesuada. Sed id ipsum id ex scelerisque rhoncus. Morbi
        interdum convallis dolor et auctor. Mauris non placerat risus. Donec
        auctor tortor ut nisi dapibus, quis aliquet magna tincidunt.
      </p>
      <p>
        Proin porta semper odio, vel suscipit est rhoncus quis. Cras nisl
        sapien, laoreet ac convallis nec, varius ac nisi. Nulla ut est ut sapien
        elementum pharetra. Donec efficitur arcu ac est facilisis, at tempor
        diam aliquet. Donec suscipit quam risus, quis congue enim congue eget.
        Aliquam imperdiet id orci ac eleifend. Curabitur sed tortor ut sem
        eleifend facilisis vitae ut turpis. Nunc ac sem mollis ex ultricies
        elementum in nec lacus. Vivamus sit amet justo suscipit, lobortis elit
        a, euismod enim. Fusce et sem eros.
      </p>
      <p></p>
      <p>
        Morbi vitae luctus turpis. Maecenas ornare elit vitae varius suscipit.
        Morbi dignissim nisi erat, vel hendrerit nibh sagittis sagittis. Sed
        scelerisque venenatis tortor vel ornare. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Cras maximus ex eu volutpat convallis.
        Vivamus at eros ac enim convallis posuere id sed enim. Etiam bibendum,
        magna sed molestie consectetur, quam ante tristique sapien, non pretium
        quam massa id ex. Aliquam erat volutpat. Morbi iaculis ante mauris, id
        ullamcorper risus convallis sit amet. Ut vehicula ipsum quis euismod
        viverra.
      </p>
      <p>
        Quisque id sapien velit. Sed vestibulum cursus libero quis viverra.
        Suspendisse volutpat, nisi ac rutrum cursus, lacus nisl pretium nisi, ut
        aliquam ex ligula sed leo. Vivamus volutpat mauris neque, id posuere
        nibh ornare id. Aenean leo leo, viverra a condimentum eget, iaculis eu
        metus. Duis iaculis felis massa, vel imperdiet tortor hendrerit ut. Nam
        pellentesque urna vel arcu dictum, id auctor nulla pharetra. Donec nec
        magna aliquet, porttitor sem faucibus, egestas turpis.
      </p>
      <p>
        Proin accumsan diam non quam volutpat, vel tristique ex mattis. Vivamus
        et luctus massa. Vestibulum tincidunt tincidunt pretium. Fusce
        dignissim, justo vel congue efficitur, mi lectus ornare neque, in
        pulvinar odio tortor vel leo. Morbi tempus lacus quis urna ultrices, at
        varius sapien lacinia. In ac pellentesque nulla. Cras vel aliquam elit.
        Cras tortor neque, mollis in tortor quis, viverra elementum ligula.
      </p>
    </div>
  );
}
